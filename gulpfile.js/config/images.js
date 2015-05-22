var config   = require('./');
var pngquant = require('imagemin-pngquant');

module.exports = {
    src:  config.sourceAssets + '/images/**',
    dest: config.publicAssets + '/images',
    imagemin: {
        optimizationLevel: 3,
        progressive: true,
        interlaced: true,
        multipass: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    }
};
