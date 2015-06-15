var $     = require('jquery');
var swipe = require('jquery-touchswipe');

SliderManager = function () {

    // attribute
    this.currentPage  = null;
    this.currentSlideAbout = null;
    this.currentSlideTutorial = null;

    // elements
    this.$document      = null;
    this.$about         = null;
    this.$arrowPrevious = null;
    this.$arrowNext     = null;
    this.$bullets       = null;
    this.$tutorial      = null;

    // initialize
    this.init();
};

SliderManager.prototype = {

    init: function () {

        // initialize elements
        this.$document = $(document);

        // events
        this.$document.on('PAGE_UPDATED', { _this: this }, function (event) {
            event.data._this.run();
        });

        this.run();
    },

    moveToRightTutorial: function () {
        if (this.currentSlideTutorial > 1) {
            this.updateClassTutorial('add');
            this.currentSlideTutorial--;
            this.updateClassTutorial('remove');
            this.updateTutorialElements();
        }
    },

    moveToLeftTutorial: function () {
        if (this.currentSlideTutorial < 4) {
            this.updateClassTutorial('add');
            this.currentSlideTutorial++;
            this.updateClassTutorial('remove');
            this.updateTutorialElements();
        }
    },

    updateClassTutorial: function (type) {
        if (type === 'add') {
            $('.slide' + this.currentSlideTutorial ,this.$tutorial).addClass('hide');
        }

        if (type === 'remove') {
            $('.slide' + this.currentSlideTutorial ,this.$tutorial).removeClass('hide');
        }
    },

    updateTutorialElements: function () {
        // bullets
        $('li', this.$bullets).removeClass('active');
        $('li:eq(' + (this.currentSlideTutorial - 1) + ')', this.$bullets).addClass('active');

        // arrows
        if (this.currentSlideTutorial <= 1) {
            $(this.$arrowPrevious).addClass('hide').removeClass('show');
            $(this.$arrowNext).removeClass('hide').addClass('show');
        } else if (this.currentSlideTutorial >= 4) {
            $(this.$arrowPrevious).removeClass('hide').addClass('show');
            $(this.$arrowNext).addClass('hide').removeClass('show');
        } else {
            $(this.$arrowNext).removeClass('hide').addClass('show');
            $(this.$arrowPrevious).removeClass('hide').addClass('show');
        }
    },

    moveAbout: function () {
        this.updateClassAbout('add');
        (this.currentSlideAbout == 1) ? this.currentSlideAbout++ : this.currentSlideAbout--;
        this.updateClassAbout('remove');
    },

    updateClassAbout: function (type) {
        if (type === 'add') {
            $('.slide' + this.currentSlideAbout ,this.$about).addClass('hide').remove('show');
        }

        if (type === 'remove') {
            $('.slide' + this.currentSlideAbout ,this.$about).removeClass('hide').addClass('show');
        }
    },

    run: function () {

        if (app.instance.currentPage.className) {
            this.currentPage = app.instance.currentPage.className;
        }

        var _self = this;
        if (/^mobile-tutorial/.test(this.currentPage)) {
            this.currentSlideTutorial = 1;
            this.$arrowPrevious = $('.arrow.prev');
            this.$arrowNext = $('.arrow.next');
            this.$bullets = $('.current-selector ul');
            this.$tutorial = $('.tutorial');

            this.updateTutorialElements();

            this.$tutorial.swipe({
                swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
                    if (direction === 'left') {
                        _self.moveToLeftTutorial();
                    } else if (direction === 'right') {
                        _self.moveToRightTutorial();
                    }
                },
                threshold: 50
            });
        } else if (/^mobile-about/.test(this.currentPage)) {
            this.currentSlideAbout = 1;
            this.$about = $('.slider');

            this.$about.swipe({
                swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
                    if (direction === 'left' || direction === 'right') {
                        _self.moveAbout();
                    }
                },
                threshold: 0
            });
        }
    }
};

module.exports = SliderManager;
