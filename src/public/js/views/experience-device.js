var Handlebars = require('hbsfy/runtime');
var template   = require('./../../views/experience-device.hbs');

module.exports = app.Extensions.View.extend({

    className: 'experience-device',

    render: function () {
        document.title = 'Découvrer la maladie d\'Alzheimer • Remind Me';
        this.$el.html(template());
        return app.Extensions.View.prototype.render.apply(this, arguments);
    }
});
