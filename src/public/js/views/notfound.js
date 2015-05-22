var Handlebars = require('hbsfy/runtime');
var template   = require('./../../views/not-found.hbs');

module.exports = app.Extensions.View.extend({

    className: 'notfound',

    render: function () {
        document.title = 'Page introuvable • Remind Me';
        this.$el.html(template());
        return app.Extensions.View.prototype.render.apply(this, arguments);
    }
});
