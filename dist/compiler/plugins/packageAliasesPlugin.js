/**
 * @remix-run/dev v1.7.2
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

var aliasPlugin = require('esbuild-plugin-alias');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var aliasPlugin__default = /*#__PURE__*/_interopDefaultLegacy(aliasPlugin);

function packageAliasesPlugin(aliases) {
  //   console.log("TODO: https://esbuild.github.io/plugins/#resolve");
  //   let toAlias: PackageAliases = {};
  //   for (let [fromName, toName] of Object.entries(aliases)) {
  //     toAlias[fromName] = require.resolve(toName);
  //   }
  //   return alias(toAlias);
  return aliasPlugin__default["default"](aliases);
}

exports.packageAliasesPlugin = packageAliasesPlugin;
