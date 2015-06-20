DeviceConnection = function (connectionId, io) {
    this.connectionId = connectionId;
    this.desktop = null;
    this.mobile  = null;
    this.io = io;
};

DeviceConnection.prototype = {

    setDesktop: function (socket) {
        var self = this;
        this.desktop = socket;

        this.desktop.on('displayQuestion', function (data) {
            self.mobile.emit('_displayQuestion_', data);
        });

        this.desktop.on('stepUpdated', function (data) {
            self.mobile.emit('_stepUpdated_', data);
        });

        this.desktop.on('goToPageAbout', function (data) {
            self.mobile.emit('_goToPageAbout_', data);
        });

        this.desktop.on('goToPageCommunity', function () {
            self.mobile.emit('_goToPageCommunity_');
        });

        this.desktop.on('goToPageExperience', function () {
            self.mobile.emit('_goToPageExperience_');
        });

        this.desktop.on('goToPageStatistics', function () {
            self.mobile.emit('_goToPageStatistics_');
        });
    },

    setMobile: function (socket) {
        var self = this;
        this.mobile = socket;

        // inform everyone in the room that there is a new connection between them
        this.io.sockets.in(this.connectionId).emit('newBridge');

        this.mobile.on('userStartExperience', function (data) {
            self.desktop.emit('_userStartExperience_', data);
        });

        this.mobile.on('userStartChallenge', function () {
            self.desktop.emit('_userStartChallenge_');
        });

        this.mobile.on('sendUserAnswer', function (data) {
            self.desktop.emit('_sendUserAnswer_', data);
        });
    }
};

module.exports = DeviceConnection;