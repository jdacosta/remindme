var Handlebars = require('hbsfy/runtime');
var qrcode     = require('jquery-qrcode');
var template   = require('./../../../views/desktop/experience-device.hbs');

module.exports = app.Extensions.View.extend({

    className: 'experience-device',

    configure: function () {
        return {
            render: 'image',
            minVersion: 1,
            maxVersion: 5,
            ecLevel: 'H',
            size: 256,
            fill: '#cc342c',
            background: null,
            text: app.Config.urlMobile + app.Config.socket.connectionId,
            radius: 0.5,
            quiet: 0,
            mode: 0
        };
    },

    generate: function () {
        $('.qrcode', this.$el).qrcode(this.configure());
    },

    render: function () {
        document.title = 'Découvrer la maladie d\'Alzheimer • Remind Me';
        this.$el.html(template({
            codeId: app.Config.socket.connectionId,
            url: app.Config.urlMobile
        }));
        this.generate();
        return app.Extensions.View.prototype.render.apply(this, arguments);
    }
});
