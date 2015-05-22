var config = require('./');

module.exports = {
    src:  config.sourceAssets + '/icons/*.svg',
    dest: config.publicAssets + '/fonts',
    sassDest: config.sourceAssets + '/sass/generated',
    template: './gulpfile.js/tasks/iconFont/template.sass',
    sassOutputName: '_icons.sass',
    fontPath: '../../assets/fonts',
    className: 'icon',
    options: {
        fontName: 'icons',
        appendCodepoints: true,
        normalize: true
    }
};
