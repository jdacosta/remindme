var Handlebars = require('hbsfy/runtime');
var template   = require('./../../../views/mobile/about.hbs');

module.exports = app.Extensions.View.extend({

    className: 'mobile-about',

    render: function () {
        document.title = 'Découvrer la maladie d\'Alzheimer • Remind Me';
        this.$el.html(template());

        if (app.Config.currentStep < 7) {
            app.Config.currentStep++;
        }
        $(document).trigger('STEP_UPDATED');

        return app.Extensions.View.prototype.render.apply(this, arguments);
    }
});
