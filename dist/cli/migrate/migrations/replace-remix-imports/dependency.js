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

let depsToEntries = deps => Object.entries(deps || {}).map(([name, versionSpec]) => ({
  name,
  versionSpec
}));
let depsToObject = deps => {
  return Object.fromEntries(deps.map(({
    name,
    versionSpec
  }) => [name, versionSpec]));
};
const isRemixPackage = name => name === "remix" || name.startsWith("@remix-run/");

exports.depsToEntries = depsToEntries;
exports.depsToObject = depsToObject;
exports.isRemixPackage = isRemixPackage;
