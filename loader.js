const path = require('path');
const loaderUtils = require('loader-utils');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse');
const generate = require('@babel/generator');
const importRemove = require('babel-plugin-danger-remove-unused-import');

module.exports = function (source) {
    const { enabled } = loaderUtils.getOptions(this);
    if (!enabled) return source;
    if (path.join(this._compiler.options.context, this._compiler.options.entry) !== this.resourcePath) return source;

    let ast = parser.parse(source, { sourceType: 'module' });
    traverse.default(ast, {
        ExportNamedDeclaration: function (path) {
            if (path.node.declaration.type !== 'VariableDeclaration') return;
            const { name } = path.node.declaration.declarations[0].id;
            if (name === 'panels' || name === 'headerbarItem' || name === 'contextmenuItem') path.remove();
        },
    });

    let runtimeData = {};

    traverse.default(ast, {
        Program(path, data) {
            // path.skip()
            path.traverse(importRemove.importTraverseObject, {
                runtimeData,
            });
            importRemove.handleRemovePath(runtimeData, {});
        },
    });

    let out = generate.default(ast, { /* options */ }, source);
    return out.code;
};
