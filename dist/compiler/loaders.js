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

const loaders = {
  ".aac": "file",
  ".avif": "file",
  ".css": "file",
  ".eot": "file",
  ".flac": "file",
  ".gif": "file",
  ".gql": "text",
  ".graphql": "text",
  ".ico": "file",
  ".jpeg": "file",
  ".jpg": "file",
  ".js": "jsx",
  ".jsx": "jsx",
  ".json": "json",
  // We preprocess md and mdx files using XDM and send through
  // the JSX for esbuild to handle
  ".md": "jsx",
  ".mdx": "jsx",
  ".mp3": "file",
  ".mp4": "file",
  ".ogg": "file",
  ".otf": "file",
  ".png": "file",
  ".sql": "text",
  ".svg": "file",
  ".ts": "ts",
  ".tsx": "tsx",
  ".ttf": "file",
  ".wasm": "file",
  ".wav": "file",
  ".webm": "file",
  ".webmanifest": "file",
  ".webp": "file",
  ".woff": "file",
  ".woff2": "file",
  ".zip": "file"
};
function getLoaderForFile(file) {
  let ext = path__namespace.extname(file);
  if (ext in loaders) return loaders[ext];
  throw new Error(`Cannot get loader for file ${file}`);
}

exports.getLoaderForFile = getLoaderForFile;
exports.loaders = loaders;
