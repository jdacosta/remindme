var Handlebars = require('hbsfy/runtime');
var template   = require('./../../../views/mobile/tutorial.hbs');

module.exports = app.Extensions.View.extend({

    className: 'mobile-tutorial',

    render: function () {
        document.title = 'Découvrer la maladie d\'Alzheimer • Remind Me';
        this.$el.html(template());
        return app.Extensions.View.prototype.render.apply(this, arguments);
    }
});
