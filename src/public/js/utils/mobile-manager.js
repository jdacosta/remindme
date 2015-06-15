var $ = require('jquery');


MobileManager = function () {

    // attributes
    this.currentPage = null;

    // elements
    this.$document = null;
    this.$header = null;
    this.$bgTriangle = null;
    this.$bgMobile = null;

    // initialize
    this.init();
};

MobileManager.prototype = {

    init: function () {

        // initialize elements
        this.$document = $(document);
        this.$header = $('.gui-mobile-header');
        this.$bgTriangle = $('.bg-triangle');
        this.$bgMobile = $('.bg-mobile');

        // events
        this.$document.on('PAGE_UPDATED', { _this: this }, function( event ) {
            event.data._this.update();
        });

        // run
        this.update();
    },

    update: function () {
        if (app.instance.currentPage.className) {
            this.currentPage = app.instance.currentPage.className;
        }

        if (/^mobile-about/.test(this.currentPage)) {
            this.$header.addClass('hide');
            this.$bgTriangle.removeClass('hide');
            this.$bgMobile.addClass('about').removeClass('hide');
        } else if (/^mobile-experience/.test(this.currentPage)) {
            this.$header.removeClass('hide');
            this.$bgTriangle.removeClass('hide');
            this.$bgMobile.removeClass('about').addClass('hide');
        } else if (/^mobile-tutorial/.test(this.currentPage)) {
            this.$header.addClass('hide');
            this.$bgTriangle.addClass('hide');
            this.$bgMobile.removeClass('about').removeClass('hide');
        }
    }
};

module.exports = MobileManager;
