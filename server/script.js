const path = require('path');
const swPrecache = require('sw-precache');
const rootDir = 'app/assets';

swPrecache.write(`${rootDir}/sw.js`, {
    staticFileGlobs: [
        'app/index.html',
        'app/assets/**/*.css',
        'app/assets/**/*.js',
        'app/assets/**/*.woff',
        'app/assets/**/*.woff2',
        'app/assets/**/*.svg',
    ],
    stripPrefixMulti: {
        'app/index.html': '/',
        'app/assets/': '/'
    },
    navigateFallback: '/index.html',
    importScripts: [
        '/sw-dynamic.js'
    ]
});