var config = require('./');

module.exports = {
    src: config.sourceAssets + '/index.html',
    dest: config.publicDirectory,
    minify: {
        empty: true,
        cdata: true,
        comments: true,
        conditionals: true,
        spare: true,
        quotes: false,
        loose: true
    }
};
