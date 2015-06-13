var Handlebars = require('hbsfy/runtime');
var template   = require('./../../../views/desktop/experience-loading.hbs');

module.exports = app.Extensions.View.extend({

    className: 'experience-loading',

    render: function () {
        document.title = 'Découvrer la maladie d\'Alzheimer • Remind Me';
        this.$el.html(template());
        return app.Extensions.View.prototype.render.apply(this, arguments);
    }
});
