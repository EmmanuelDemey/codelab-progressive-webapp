const swPrecache = require('sw-precache');
const rootDir = 'app/assets';

swPrecache.write(`${rootDir}/sw.js`, {
    staticFileGlobs: [
        'app/index.html',
        `${rootDir}/**/*.css`,
        `${rootDir}/**/*.js`,
        `${rootDir}/**/*.woff`,
        `${rootDir}/**/*.woff2`,
        `${rootDir}/**/*.svg`,
    ],
    stripPrefixMulti: {
        'app/index.html': '/',
        'app/assets/': '/'
    },
    importScripts: [
        '/sw-dynamic.js'
    ]
});