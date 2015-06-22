var $ = require('jquery');


WebcamManager = function () {

    // attributes
    this.cameraActive = false;
    this.userMedia = false;
    this.liveStream = null;

    // elements
    this.$document = null;
    this.$liveVideo = null;
    this.$liveImage = null;
    this.$liveCanvas = null;
    this.$snapshot = null;
    this.$photobox = null;

    // initialize
    this.init();
};

WebcamManager.prototype = {

    init: function () {
        // initialize, check for getUserMedia support
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

        // initialize attributes
        this.userMedia = !!navigator.getUserMedia && !!window.URL;

        // initialize elements
        this.$document = $(document);

        // events
        this.$document.on('PAGE_UPDATED', { _this: this }, function (event) {
            event.data._this.liveWebcam();
        });
    },

    liveWebcam: function () {
        this.$liveVideo = $('.webcam-video');
        this.$liveCanvas = $('.webcam-canvas');
        this.$liveImage = $('.webcam-image');
        this.$photobox = $('.photo-box');

        if (this.userMedia) {
            if (/^community-challenge$/.test(app.instance.currentPage.className)) {
                this.$snapshot = $('.webcam');
                if (this.cameraActive && this.liveStream) {
                    this.liveStream.attr('src', window.URL.createObjectURL(this.liveStream));
                } else {
                    var self = this;
                    navigator.getUserMedia({video: true, audio: false}, function(stream) {
                        self.liveStream = stream;
                        self.cameraActive = true;
                        self.$liveVideo.attr('src', window.URL.createObjectURL(self.liveStream));
                    }, this.errorCallback);
                }
                this.takeSnapshot()
            } else {
                this.cameraActive = false;
                if (this.liveStream) {
                    this.liveStream.stop();
                }
            }
        } else {
            console.log('[ERROR] navigator.getUserMedia and window.URL error');
        }
    },

    errorCallback: function (error) {
        console.log('Video capture error : ', error.code);
    },

    takeSnapshot: function () {
        this.$snapshot.on('click', { _this : this }, function (event) {
            event.data._this.$liveCanvas[0].getContext('2d').drawImage(event.data._this.$liveVideo[0], 0, 0);
            event.data._this.$liveImage.attr('src', event.data._this.$liveCanvas[0].toDataURL('image/webp'));
            event.data._this.$liveImage.removeClass('hidden');
            event.data._this.$photobox.addClass('hidden');
            event.data._this.$snapshot.off();

            event.data._this.cameraActive = false;
            if (event.data._this.liveStream) {
                event.data._this.liveStream.stop();
            }
        });
    }
};

module.exports = WebcamManager;
