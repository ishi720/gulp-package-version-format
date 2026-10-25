'use strict';

const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
    {
        ignores: ['coverage/', '__test__/t*/'],
    },
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 2018,
            sourceType: 'commonjs',
            globals: {
                ...globals.node,
                ...globals.jest,
            },
        },
    },
];
