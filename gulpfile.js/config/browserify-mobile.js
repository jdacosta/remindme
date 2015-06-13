var config = require('./');

module.exports = {
    name: 'app-mobile.js',
    dest: config.publicAssets + '/js/',
    browserify: {
        entries: [config.sourceAssets + '/js/app-mobile.js'],
        debug: false
    }
};
