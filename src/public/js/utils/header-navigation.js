var $ = require('jquery');
var _ = require('lodash');


HeaderNavigation = function () {

    // define attributes
    this.currentPage = null;

    // define elements
    this.$document = null;
    this.$itemsNavigation = null;
    this.$itemExperience = null;
    this.$itemAbout = null;
    this.$itemCommunity = null;

    // define attributes
     this.init();
};

HeaderNavigation.prototype = {

    init: function () {
        this.$document = $(document);
        this.$itemsNavigation = $('.gui-header nav li');
        this.$itemExperience = $('.experience', this.$itemsNavigation);
        this.$itemAbout = $('.about', this.$itemsNavigation);
        this.$itemCommunity = $('.community', this.$itemsNavigation);
        this.updateHeader();
    },

    cleanNavivation: function () {
        this.$itemExperience.removeClass('active');
        this.$itemAbout.removeClass('active');
        this.$itemCommunity.removeClass('active');
    },

    updateHeader: function () {
        if (app.instance.currentPage.className) {
            this.currentPage = app.instance.currentPage.className;
        }

        if (/^experience-[a-zA-Z]{1,}$/.test(this.currentPage)) {
            this.cleanNavivation();
            this.$itemExperience.addClass('active');

        } else if (/^about$/.test(this.currentPage)) {
            this.cleanNavivation();
            this.$itemAbout.addClass('active');
        } else if (/^community/.test(this.currentPage)) {
            this.cleanNavivation();
            this.$itemCommunity.addClass('active');
        }

       /* _.delay(function (self) {
            self.updateHeader();
        }, 500, this);*/

        var self = this;
        this.$document.on('PAGE_UPDATED', function( event ) {
            self.updateHeader();
        });
    }
};

module.exports = HeaderNavigation;