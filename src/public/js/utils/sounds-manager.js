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
            } else {
                event.data._this.$soundBtnIcon.addClass('icon-sound-on').removeClass('icon-sound-off');
            }
        });
    },

    loadSounds: function () {
        soundjs.Sound.registerSound('../assets/sounds/controls-hover.mp3', 'controls-hover');
        soundjs.Sound.registerSound('../assets/sounds/mobile-notification.mp3', 'mobile-notification');
    },

    playsoundById: function (soundID) {
        if (!this.soundMute) {
            soundjs.Sound.play(soundID);
        }
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
            event.data._this.playsoundById($(this).attr('data-play-click'));
        });

        // hover event
        this.$playSoundHover.on('mouseover', { _this: this}, function (event) {
            event.data._this.playsoundById($(this).attr('data-play-hover'));
        });
    }
};

module.exports = SoundsManager;
