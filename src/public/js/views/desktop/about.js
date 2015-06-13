var Handlebars      = require('hbsfy/runtime');
var template        = require('./../../../views/desktop/about.hbs');
var notificationHbs = require('./../../../views/desktop/partials/notification.hbs');

Handlebars.registerPartial('notification', notificationHbs);

module.exports = app.Extensions.View.extend({

    className: 'about',

    render: function () {
        document.title = 'À propos • Remind Me';
        this.$el.html(template());
        return app.Extensions.View.prototype.render.apply(this, arguments);
    }
});
