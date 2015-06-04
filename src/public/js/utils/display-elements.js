var $ = require('jquery');
var _ = require('lodash');


DisplayElements = function () {

    // define attributes
    this.currentPage = null;
    this.isMoved   = false;
    this.isHidden  = false;
    this.iteration = 0;

    // define elements
    this.$document       = null;
    this.$headerSocial   = null;
    this.$footerLinks    = null;
    this.$footerControls = null;

    // initialize
    this.init();
};

DisplayElements.prototype = {

    init: function () {
        this.$document       = $(document);
        this.$headerSocial   = $('.gui-header .social');
        this.$footerLinks    = $('.gui-footer nav');
        this.$footerControls = $('.gui-footer .gui-controls');

        var self = this;
        this.$document.mousemove(function (event) {
            self.isMoved = true;
        });

        this.displayManager();
    },

    displayManager: function () {

        if (app.instance.currentPage.className) {
            this.currentPage = app.instance.currentPage.className;
        }

        if (this.isMoved) {
            this.iteration = 0;
            if (this.isHidden) {
                this.show();
            }
        } else {
            if (/^experience-home$/.test(this.currentPage) ||
                /^experience-statistics$/.test(this.currentPage)) {
                if (!this.isHidden && this.iteration >= 5) {
                    this.hide();
                }
            } else {
                this.iteration = 0;
                if (this.isHidden) {
                    this.show();
                }
            }
        }

        this.isMoved = false;
        _.delay(function (self) {
            self.iteration++;
            self.displayManager();
        }, 1000, this);
    },

    hide: function () {
        this.$headerSocial.addClass('hidden');
        this.$footerLinks.addClass('hidden');
        this.$footerControls.addClass('hidden');
        this.isHidden = true;
    },

    show: function () {
        this.$headerSocial.removeClass('hidden');
        this.$footerLinks.removeClass('hidden');
        this.$footerControls.removeClass('hidden');
        this.isHidden = false;
    }
};

module.exports = DisplayElements;
