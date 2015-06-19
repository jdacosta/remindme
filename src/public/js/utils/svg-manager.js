var Vivus = require('vivus');
var $     = require('jquery');


SVGManager = function () {

    // attributes
    this.currentPage = null;

    // elements
    this.$document = null;

    // initialize
    this.init();
};

SVGManager.prototype = {

    init: function () {

        // initialize elements
        this.$document = $(document);

        // initialize events
        this.$document.on('PAGE_UPDATED', { _this: this }, function (event) {
            event.data._this.animateSVG();
        });

        this.animateSVG();
        this.animateLogo();
    },

    animateLogo: function () {
        new Vivus('logo-circle', {
            type: 'delayed',
            duration: 300,
            pathTimingFunction: Vivus.EASE_OUT,
            animTimingFunction: Vivus.EASE
        });
    },

    animateSVG: function () {
        if (app.instance.currentPage.className) {
            this.currentPage = app.instance.currentPage.className;
        }

        if (/^experience-enter/.test(this.currentPage) ||
            /^experience-exit/.test(this.currentPage) ||
            /^experience-challenge/.test(this.currentPage)) {
            new Vivus('enter-svg', {
                type: 'async',
                duration: 250,
                pathTimingFunction: Vivus.EASE_OUT,
                animTimingFunction: Vivus.EASE
            });
        } else if (/^experience-device$/.test(this.currentPage)) {
            new Vivus('device-svg', {
                type: 'delayed',
                duration: 300,
                pathTimingFunction: Vivus.EASE_OUT,
                animTimingFunction: Vivus.EASE
            });
        } else if (/^experience-load/.test(this.currentPage)) {
            new Vivus('load-svg', {
                type: 'delayed',
                duration: 500,
                pathTimingFunction: Vivus.EASE_OUT,
                animTimingFunction: Vivus.EASE
            });
        }
    }
};

module.exports = SVGManager;
