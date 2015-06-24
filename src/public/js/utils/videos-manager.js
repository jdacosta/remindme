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
        this.$videoSource = $('source', this.$video);

        // events
        this.$document.on('PAGE_UPDATED', { _this: this }, function (event) {
            event.data._this.update();
        });
    },

    update: function () {
        if (app.instance.currentPage.className) {
            this.currentPage = app.instance.currentPage.className;
        }

        if (/^about$/.test(this.currentPage)) {
            if (this.currentVideo != 'about') {
                this.currentVideo = 'about';
                this.liveVideo(this.currentVideo, true);
            }
        } else if (/^community$/.test(this.currentPage) || /^community-challenge$/.test(this.currentPage)) {
            if (this.currentVideo != 'community') {
                this.currentVideo = 'community';
                this.liveVideo(this.currentVideo, true);
            }
        } else if (/^experience-home$/.test(this.currentPage)) {
            this.currentVideo = 'experience';
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
                event.data._this.$video.prop('loop', true);
                event.data._this.$video.load();
                event.data._this.$video[0].volume = 0.1;
                event.data._this.$video.addClass('is-visible').removeClass('is-hidden');
            });
        } else {
            this.$videoSource.attr('src', 'assets/videos/' + name + '.mp4');
            this.$video.prop('loop', true);
            this.$video.load();
            this.$video[0].volume = 0.1;
        }
    }
};

module.exports = VideosManager;
