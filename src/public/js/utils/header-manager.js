var $ = require('jquery');


HeaderManager = function () {

    // attributes
    this.currentPage = null;

    // elements
    this.$document = null;
    this.$window = null;
    this.$activeItem = null;
    this.$itemsNavigation = null;
    this.$itemAbout = null;
    this.$itemCommunity = null;
    this.$itemExperience = null;
    this.$itemLine = null;

    // initialize
     this.init();
};

HeaderManager.prototype = {

    init: function () {

        // initialize elements
        this.$document = $(document);
        this.$window = $(window);
        this.$itemsNavigation = $('.gui-header nav');
        this.$itemAbout = $('.about', this.$itemsNavigation);
        this.$itemCommunity = $('.community', this.$itemsNavigation);
        this.$itemExperience = $('.experience', this.$itemsNavigation);
        this.$itemLine = $('.line', this.$itemsNavigation);

        // events
        this.$document.on('PAGE_UPDATED', { _this: this }, function( event ) {
            event.data._this.updateHeader();
        });
        this.$window.on('resize', { _this: this }, function( event ) {
            event.data._this.updateLineBar();
        });

        // run
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

        this.updateLineBar();
    },

    updateLineBar: function () {
        this.$activeItem = $('.active', this.$itemsNavigation);
        this.$itemLine.animate({
            left: this.$activeItem.parent().position().left,
            width: this.$activeItem.parent().width()
        });
    }
};

module.exports = HeaderManager;
