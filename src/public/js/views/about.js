var Handlebars = require('hbsfy/runtime');
var template   = require('./../../views/about.hbs');
//var headerHbs  = require('./../../views/partials/header.hbs');
//var footerHbs  = require('./../../views/partials/footer.hbs');

//Handlebars.registerPartial('header', headerHbs);
//Handlebars.registerPartial('footer', footerHbs);

module.exports = app.Extensions.View.extend({

    className: 'about',

    render: function () {
        document.title = 'À propos • Remind Me';
        this.$el.html(template());
        return app.Extensions.View.prototype.render.apply(this, arguments);
    }
});
