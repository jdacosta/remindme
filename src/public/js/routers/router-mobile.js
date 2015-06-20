var Backbone = require('backbone');

module.exports = Backbone.Router.extend({

    routes: {
        '': 'error',
        'about': 'about',
        'community': 'community',
        'experience': 'experience',
        ':id': 'tutorial'
    },

    initialize: function () {
        Backbone.history.start();
    },

    about: function () {
        var view = new app.Views.About();
        app.instance.goto(view);
    },

    community: function () {
        var view = new app.Views.Community();
        app.instance.goto(view);
    },

    error: function () {
        var view = new app.Views.Error();
        app.instance.goto(view);
    },

    experience: function () {
        var view = new app.Views.Experience();
        app.instance.goto(view);
    },

    tutorial: function (id) {
        id = id.toUpperCase();
        if (/^[A-Z0-9]{4}$/.test(id)) {
            app.Config.socket.connectionId = id;
            $(document).trigger('NEW_EXP_ID');
            var view = new app.Views.Tutorial();
            app.instance.goto(view);
        } else {
            var view = new app.Views.Error();
            app.instance.goto(view);
        }
    }
});
