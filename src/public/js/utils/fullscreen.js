var screenfull = require('screenfull');
var $          = require('jquery');


Fullscreen = function () {

    // define attributes
    this.$element = null;

    // initialize
    this.init();
};

Fullscreen.prototype = {

    init: function () {
        this.$element = $('.gui-footer .button-fullscreen');
        this.setFullscreen();
    },

    setFullscreen: function () {
        this.$element.click(function () {
            if (screenfull.enabled) {
                screenfull.toggle();
            }
        });
    }
};

module.exports = Fullscreen;
