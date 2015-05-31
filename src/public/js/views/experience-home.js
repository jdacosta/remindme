var Handlebars      = require('hbsfy/runtime');
var template        = require('./../../views/experience-home.hbs');
var stepinfosHbs    = require('./../../views/partials/step-infos.hbs');
var timelineHbs     = require('./../../views/partials/timeline.hbs');
var notificationHbs = require('./../../views/partials/notification.hbs');
var navigationHbs   = require('./../../views/partials/navigation.hbs');

Handlebars.registerPartial('stepinfos', stepinfosHbs);
Handlebars.registerPartial('timeline', timelineHbs);
Handlebars.registerPartial('notification', notificationHbs);
Handlebars.registerPartial('navigation', navigationHbs);

module.exports = app.Extensions.View.extend({

    className: 'experience-home',

    render: function () {
        document.title = 'Découvrer la maladie d\'Alzheimer • Remind Me';
        this.$el.html(template());
        return app.Extensions.View.prototype.render.apply(this, arguments);
    }
});
