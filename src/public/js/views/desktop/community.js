var Handlebars = require('hbsfy/runtime');
var template   = require('./../../../views/desktop/community.hbs');

module.exports = app.Extensions.View.extend({

    className: 'community',

    render: function () {
        document.title = 'Communauté • Remind Me';
        this.$el.html(template());
        return app.Extensions.View.prototype.render.apply(this, arguments);
    }
});
