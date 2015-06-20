var Handlebars = require('hbsfy/runtime');
var template   = require('./../../../views/mobile/community.hbs');

module.exports = app.Extensions.View.extend({

    className: 'mobile-community',

    render: function () {
        document.title = 'Découvrer la maladie d\'Alzheimer • Remind Me';
        this.$el.html(template());
        return app.Extensions.View.prototype.render.apply(this, arguments);
    }
});
