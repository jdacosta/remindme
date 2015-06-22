var soundjs = require('soundjs');
var $       = require('jquery');


SoundsManager = function () {

    // attribute
    this.soundMute = false;

    // elements
    this.$document = null;
    this.$soundBtn = null;
    this.$soundBtnIcon = null;
    this.$playSoundClick = null;
    this.$playSoundHover = null;
    this.$video = null;

    // initialize
    this.init();
};

SoundsManager.prototype = {

    init: function () {

        // initialize elements
        this.$document = $(document);
        this.$soundBtn = $('.gui-footer .button-sound');
        this.$soundBtnIcon = $('i', this.$soundBtn);
        this.$playSoundClick = $('[data-play-click]');
        this.$playSoundHover = $('[data-play-hover]');
        this.$video = $('video')[0];

        // load all sounds
        this.loadSounds();

        // initialize events
        this.elementsEvents();
        this.$document.on('PAGE_UPDATED', { _this: this }, function( event ) {
            event.data._this.updateElements();
        });
        this.$soundBtn.on('click', { _this: this }, function( event ) {
            event.data._this.soundMute = !event.data._this.soundMute;
            if (event.data._this.soundMute) {
                event.data._this.$soundBtnIcon.addClass('icon-sound-off').removeClass('icon-sound-on');
                event.data._this.$video.volume = 0;
                event.data._this.$document.trigger('VOLUME_OFF');
            } else {
                event.data._this.$soundBtnIcon.addClass('icon-sound-on').removeClass('icon-sound-off');
                event.data._this.$video.volume = 0.7;
                event.data._this.$document.trigger('VOLUME_ON');
            }
        });
    },

    loadSounds: function () {
        soundjs.Sound.registerSound('../assets/sounds/controls-hover.mp3', 'controls-hover');
        soundjs.Sound.registerSound('../assets/sounds/mobile-notification.mp3', 'mobile-notification');
        soundjs.Sound.registerSound('../assets/sounds/music-experience.mp3', 'music-experience');
    },

    playsoundById: function (soundID, volume, loop) {
        var self = this, sound;

        if (loop) {
            sound = soundjs.Sound.play(soundID, null, null, null, -1);
        } else {
            sound = soundjs.Sound.play(soundID);
        }

        if (!this.soundMute) {
            sound.volume = volume;
        } else {
            sound.volume = 0;
        }

        return sound;
    },

    updateElements: function () {
        this.$playSoundClick.off('click');
        this.$playSoundHover.off('mouseover');

        this.$playSoundClick = $('[data-play-click]');
        this.$playSoundHover = $('[data-play-hover]');

        this.elementsEvents();
    },

    elementsEvents: function () {

        // click event
        this.$playSoundClick.on('click', { _this: this}, function (event) {
            event.data._this.playsoundById($(this).attr('data-play-click'), 1, false);
        });

        // hover event
        this.$playSoundHover.on('mouseover', { _this: this}, function (event) {
            event.data._this.playsoundById($(this).attr('data-play-hover'), 1, false);
        });
    }
};

module.exports = SoundsManager;
