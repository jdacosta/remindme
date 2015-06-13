var $ = require('jquery');


VideosManager = function () {

    // attributes
    this.currentPage = null;
    this.currentVideo = null;

    // elements
    this.$document = null;
    this.$video = null;
    this.$videoSource = null;

    // initialize
    this.init();
};

VideosManager.prototype = {

    init: function () {
        // initialize elements
        this.$document = $(document);
        this.$video = $('.bg-video');
        this.$videoSource = $('source', this.$videoSource);

        // events
        this.$document.on('PAGE_UPDATED', { _this: this }, function (event) {
            event.data._this.update();
        });
    },

    update: function () {
        if (app.instance.currentPage.className) {
            this.currentPage = app.instance.currentPage.className;
        }

        if (/^experience-home$/.test(this.currentPage)) {
            this.experienceVideo();
        } else if (/^about$/.test(this.currentPage)) {
            if (this.currentVideo != 'about') {
                this.currentVideo = 'about';
                this.liveVideo(this.currentVideo, true);
            }
        } else {
            if (this.currentVideo != 'background') {
                this.currentVideo = 'background';
                this.liveVideo(this.currentVideo, true);
            }
        }
    },

    liveVideo: function (name, transition) {
        if (transition) {
            this.$video.addClass('is-hidden').removeClass('is-visible');
            this.$video.one('animationend', { _this: this }, function ( event ) {
                event.data._this.$videoSource.attr('src', 'assets/videos/' + name + '.mp4');
                event.data._this.$video.load();
                event.data._this.$video.addClass('is-visible').removeClass('is-hidden');
            });
        } else {
            this.$videoSource.attr('src', 'assets/videos/' + name + '.mp4');
            this.$video.load();
        }
    },

    experienceVideo: function () {

    }
};

module.exports = VideosManager;
