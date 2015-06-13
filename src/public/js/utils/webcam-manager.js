var $ = require('jquery');


WebcamManager = function () {

    // attributes
    this.cameraActive = false;
    this.userMedia = false;
    this.liveStream = null;

    // elements
    this.$document = null;
    this.$liveVideo = null;
    this.$snapshot = null;

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

        if (this.userMedia) {
            if (/^community$/.test(app.instance.currentPage.className)) {
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
            } else {
                this.cameraActive = false;
                if (this.liveStream) {
                    this.liveStream.stop();
                }
            }
        } else {
            console.log('navigator.getUserMedia and window.URL error');
        }
    },

    errorCallback: function (error) {
        console.log('Video capture error : ', error.code);
    },

    takeSnapshot: function () {
        this.$snapshot.on('click', function () {
            //.drawImage(this.liveStream, 0, 0, 640, 480);
        });
    }
};

module.exports = WebcamManager;
