var Handlebars = require('hbsfy/runtime');
var template   = require('./../../../views/mobile/experience.hbs');

module.exports = app.Extensions.View.extend({

    className: 'mobile-experience',

    render: function () {
        console.log(app.Config.currentStep);
        document.title = 'Découvrer la maladie d\'Alzheimer • Remind Me';
        this.$el.html(template());
        return app.Extensions.View.prototype.render.apply(this, arguments);
    }
});
