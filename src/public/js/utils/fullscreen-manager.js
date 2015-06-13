var screenfull = require('screenfull');
var $          = require('jquery');


FullscreenManager = function () {

    // define element
    this.$fullscreen = null;

    // initialize
    this.init();
};

FullscreenManager.prototype = {

    init: function () {
        this.$fullscreen = $('.gui-footer .button-fullscreen');
        this.setFullscreen();
    },

    setFullscreen: function () {
        this.$fullscreen.on('click', function () {
            if (screenfull.enabled) {
                screenfull.toggle();
            }
        });
    }
};

module.exports = FullscreenManager;
