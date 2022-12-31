/**
 * @remix-run/dev v1.9.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var path = require('path');
var module$1 = require('module');
var esbuild = require('esbuild');
var nodeModulesPolyfill = require('@esbuild-plugins/node-modules-polyfill');
var aliasPlugin = require('esbuild-plugin-alias');
var assets = require('./assets.js');
var dependencies = require('./dependencies.js');
var loaders = require('./loaders.js');
var browserRouteModulesPlugin = require('./plugins/browserRouteModulesPlugin.js');
var cssFilePlugin = require('./plugins/cssFilePlugin.js');
var deprecatedRemixPackagePlugin = require('./plugins/deprecatedRemixPackagePlugin.js');
var emptyModulesPlugin = require('./plugins/emptyModulesPlugin.js');
var mdx = require('./plugins/mdx.js');
var urlImportsPlugin = require('./plugins/urlImportsPlugin.js');
var fs = require('./utils/fs.js');
var invariant = require('../invariant.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var path__namespace = /*#__PURE__*/_interopNamespace(path);
var esbuild__namespace = /*#__PURE__*/_interopNamespace(esbuild);
var aliasPlugin__default = /*#__PURE__*/_interopDefaultLegacy(aliasPlugin);

const getExternals = remixConfig => {
  // For the browser build, exclude node built-ins that don't have a
  // browser-safe alternative installed in node_modules. Nothing should
  // *actually* be external in the browser build (we want to bundle all deps) so
  // this is really just making sure we don't accidentally have any dependencies
  // on node built-ins in browser bundles.
  let dependencies$1 = Object.keys(dependencies.getAppDependencies(remixConfig));
  let fakeBuiltins = module$1.builtinModules.filter(mod => dependencies$1.includes(mod));

  if (fakeBuiltins.length > 0) {
    throw new Error(`It appears you're using a module that is built in to node, but you installed it as a dependency which could cause problems. Please remove ${fakeBuiltins.join(", ")} before continuing.`);
  }

  return module$1.builtinModules.filter(mod => !dependencies$1.includes(mod));
};

const writeAssetsManifest = async (config, assetsManifest) => {
  let filename = `manifest-${assetsManifest.version.toUpperCase()}.js`;
  assetsManifest.url = config.publicPath + filename;
  await fs.writeFileSafe(path__namespace.join(config.assetsBuildDirectory, filename), `window.__remixManifest=${JSON.stringify(assetsManifest)};`);
};

const createEsbuildConfig = (config, options) => {
  let entryPoints = {
    "entry.client": path__namespace.resolve(config.appDirectory, config.entryClientFile)
  };

  for (let id of Object.keys(config.routes)) {
    // All route entry points are virtual modules that will be loaded by the
    // browserEntryPointsPlugin. This allows us to tree-shake server-only code
    // that we don't want to run in the browser (i.e. action & loader).
    entryPoints[id] = config.routes[id].file + "?browser";
  }

  let plugins = [deprecatedRemixPackagePlugin.deprecatedRemixPackagePlugin(options.onWarning), cssFilePlugin.cssFilePlugin(options), urlImportsPlugin.urlImportsPlugin(), mdx.mdxPlugin(config), browserRouteModulesPlugin.browserRouteModulesPlugin(config, /\?browser$/), emptyModulesPlugin.emptyModulesPlugin(config, /\.server(\.[jt]sx?)?$/), nodeModulesPolyfill.NodeModulesPolyfillPlugin()];

  if (config.resolveAliases) {
    plugins.unshift(aliasPlugin__default["default"](config.resolveAliases));
  }

  return {
    entryPoints,
    outdir: config.assetsBuildDirectory,
    platform: "browser",
    format: "esm",
    external: getExternals(config),
    loader: loaders.loaders,
    bundle: true,
    logLevel: "silent",
    splitting: true,
    sourcemap: options.sourcemap,
    // As pointed out by https://github.com/evanw/esbuild/issues/2440, when tsconfig is set to
    // `undefined`, esbuild will keep looking for a tsconfig.json recursively up. This unwanted
    // behavior can only be avoided by creating an empty tsconfig file in the root directory.
    tsconfig: config.tsconfigPath,
    mainFields: ["browser", "module", "main"],
    treeShaking: true,
    minify: options.mode === "production",
    entryNames: "[dir]/[name]-[hash]",
    chunkNames: "_shared/[name]-[hash]",
    assetNames: "_assets/[name]-[hash]",
    publicPath: config.publicPath,
    define: {
      "process.env.NODE_ENV": JSON.stringify(options.mode),
      "process.env.REMIX_DEV_SERVER_WS_PORT": JSON.stringify(config.devServerPort)
    },
    jsx: "automatic",
    jsxDev: options.mode !== "production",
    plugins,
    resolveExtensions: config.resolveExtensions
  };
};

const createBrowserCompiler = (remixConfig, options) => {
  let compiler;
  let esbuildConfig = createEsbuildConfig(remixConfig, options);

  let compile = async manifestChannel => {
    let metafile;

    if (compiler === undefined) {
      compiler = await esbuild__namespace.build({ ...esbuildConfig,
        metafile: true,
        incremental: true
      });
      invariant["default"](compiler.metafile, "Expected metafile to be defined");
      metafile = compiler.metafile;
    } else {
      let rebuild = await compiler.rebuild();
      invariant["default"](rebuild.metafile, "Expected metafile to be defined");
      metafile = rebuild.metafile;
    }

    let manifest = await assets.createAssetsManifest(remixConfig, metafile);
    manifestChannel.write(manifest);
    await writeAssetsManifest(remixConfig, manifest);
  };

  return {
    compile,
    dispose: () => {
      var _compiler;

      return (_compiler = compiler) === null || _compiler === void 0 ? void 0 : _compiler.rebuild.dispose();
    }
  };
};

exports.createBrowserCompiler = createBrowserCompiler;
