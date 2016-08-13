var path = require('path');
var fs = require('fs');

function fileExistsWithCaseSync(filepath) {
    var dir = path.dirname(filepath);
    if (dir === '/' || dir === '.') return true;
    var filenames = fs.readdirSync(dir);
    if (filenames.indexOf(path.basename(filepath)) === - 1) {
        return false;
    }
    return fileExistsWithCaseSync(dir);
}

module.exports = {
    parser: 'babel-eslint',
    extends: 'airbnb',
    parserOptions: {
        ecmaVersion: 7,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
            experimentalObjectRestSpread: true,
        },
    },
    env: {
        browser: true,
        node: true,
        mocha: true,
    },
    rules: {
        semi: 0,
       'no-underscore-dangle': 0,
       'func-name': 0,
       'no-unused-vars': [1, { "vars": "all", "args": "none" }],
       "react/prop-types": [2, { ignore: ["children", "store"] }],
    },
};
