var Backbone = require('backbone');

module.exports = Backbone.Router.extend({

    routes: {
        '': 'experience',
        'about': 'about',
        'tutorial': 'tutorial',
        ':id': 'experience'
    },

    initialize: function () {
        Backbone.history.start();
    },

    about: function () {
        var view = new app.Views.About();
        app.instance.goto(view);
    },

    tutorial: function () {
        var view = new app.Views.Tutorial();
        app.instance.goto(view);
    },

    experience: function (id) {
        id = id.toUpperCase();
        if (/^[A-Z0-9]{4}$/.test(id)) {
            console.log('New connection, room ID : ' + id);
            var view = new app.Views.Experience();
            app.instance.goto(view);
        } else {
            var view = new app.Views.Tutorial();
            app.instance.goto(view);
        }
    }
});
