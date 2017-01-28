/**
 * Created by ZY on 2017/1/28.
 */
var register = require('babel-core/register');

register({
   presets:['stage-3']
});

require('./koa_Start.js');
/*
 npm install
 koa2@1.0.0 C:\Users\**\Desktop\Note~\test\Node
 +-- babel-core@6.13.2
 | +-- babel-code-frame@6.22.0
 | | +-- chalk@1.1.3
 | | | +-- ansi-styles@2.2.1
 | | | +-- escape-string-regexp@1.0.5
 | | | +-- has-ansi@2.0.0
 | | | | `-- ansi-regex@2.1.1
 | | | +-- strip-ansi@3.0.1
 | | | `-- supports-color@2.0.0
 | | +-- esutils@2.0.2
 | | `-- js-tokens@3.0.0
 | +-- babel-generator@6.22.0
 | | +-- detect-indent@4.0.0
 | | | `-- repeating@2.0.1
 | | |   `-- is-finite@1.0.2
 | | |     `-- number-is-nan@1.0.1
 | | `-- jsesc@1.3.0
 | +-- babel-helpers@6.22.0
 | +-- babel-messages@6.22.0
 | +-- babel-register@6.22.0
 | | +-- babel-core@6.22.1
 | | | `-- json5@0.5.1
 | | +-- home-or-tmp@2.0.0
 | | | +-- os-homedir@1.0.2
 | | | `-- os-tmpdir@1.0.2
 | | +-- mkdirp@0.5.1
 | | | `-- minimist@0.0.8
 | | `-- source-map-support@0.4.11
 | +-- babel-runtime@6.22.0
 | | `-- regenerator-runtime@0.10.1
 | +-- babel-template@6.22.0
 | +-- babel-traverse@6.22.1
 | | +-- globals@9.14.0
 | | `-- invariant@2.2.2
 | |   `-- loose-envify@1.3.1
 | +-- babel-types@6.22.0
 | | `-- to-fast-properties@1.0.2
 | +-- babylon@6.15.0
 | +-- convert-source-map@1.3.0
 | +-- debug@2.6.0
 | | `-- ms@0.7.2
 | +-- json5@0.4.0
 | +-- lodash@4.17.4
 | +-- minimatch@3.0.3
 | | `-- brace-expansion@1.1.6
 | |   +-- balanced-match@0.4.2
 | |   `-- concat-map@0.0.1
 | +-- path-exists@1.0.0
 | +-- path-is-absolute@1.0.1
 | +-- private@0.1.6
 | +-- shebang-regex@1.0.0
 | +-- slash@1.0.0
 | `-- source-map@0.5.6
 +-- babel-polyfill@6.13.0
 | +-- core-js@2.4.1
 | `-- regenerator-runtime@0.9.6
 +-- babel-preset-es2015-node6@0.3.0
 | +-- babel-plugin-transform-es2015-destructuring@6.22.0
 | +-- babel-plugin-transform-es2015-function-name@6.22.0
 | | `-- babel-helper-function-name@6.22.0
 | +-- babel-plugin-transform-es2015-modules-commonjs@6.22.0
 | | `-- babel-plugin-transform-strict-mode@6.22.0
 | `-- babel-plugin-transform-es2015-parameters@6.22.0
 |   +-- babel-helper-call-delegate@6.22.0
 |   | `-- babel-helper-hoist-variables@6.22.0
 |   `-- babel-helper-get-function-arity@6.22.0
 +-- babel-preset-stage-3@6.5.0
 | +-- babel-plugin-transform-async-to-generator@6.22.0
 | | +-- babel-helper-remap-async-to-generator@6.22.0
 | | `-- babel-plugin-syntax-async-functions@6.13.0
 | `-- babel-plugin-transform-exponentiation-operator@6.22.0
 |   +-- babel-helper-builder-binary-assignment-operator-visitor@6.22.0
 |   | `-- babel-helper-explode-assignable-expression@6.22.0
 |   `-- babel-plugin-syntax-exponentiation-operator@6.13.0
 `-- koa@2.0.0
 +-- accepts@1.3.3
 | `-- negotiator@0.6.1
 +-- content-disposition@0.5.2
 +-- content-type@1.0.2
 +-- cookies@0.6.2
 | `-- keygrip@1.0.1
 +-- delegates@1.0.0
 +-- depd@1.1.0
 +-- destroy@1.0.4
 +-- error-inject@1.0.0
 +-- escape-html@1.0.3
 +-- fresh@0.3.0
 +-- http-assert@1.2.0
 | +-- deep-equal@1.0.1
 | `-- http-errors@1.4.0
 |   `-- inherits@2.0.1
 +-- http-errors@1.5.1
 | +-- inherits@2.0.3
 | `-- setprototypeof@1.0.2
 +-- is-generator-function@1.0.6
 +-- koa-compose@3.2.1
 | `-- any-promise@1.3.0
 +-- koa-convert@1.2.0
 | `-- co@4.6.0
 +-- koa-is-json@1.0.0
 +-- mime-types@2.1.14
 | `-- mime-db@1.26.0
 +-- on-finished@2.3.0
 | `-- ee-first@1.1.1
 +-- only@0.0.2
 +-- parseurl@1.3.1
 +-- statuses@1.3.1
 +-- type-is@1.6.14
 | `-- media-typer@0.3.0
 `-- vary@1.1.0

 */

/*
log:
 app started at port 3000...
 (node:10496) DeprecationWarning:
  `DEBUG_FD` is deprecated. Override `debug.log`
 if you want to use a different log function (https://git.io/vMUyr)
 */

/*
 为什么先加载babel-core/register，
 再加载app.js，魔法就会生效？
 原因是第一个require()是Node正常加载babel-core/register的过程，
 然后，
 Babel会用自己的require()替换掉Node的require()，
 随后用require()加载的所有代码均会被Babel自动转码后再加载
 */

/*
 还可以直接用命令node start.js在命令行启动程序，
 或者用npm start启动。
 npm start命令会让npm执行定义在package.json文件中的start对应命令：

 "scripts": {
 "start": "node start.js"
 }
 */
