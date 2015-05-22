var Backbone = require('backbone');

module.exports = Backbone.Router.extend({

    routes: {
        '': 'experience',
        'about': 'about',
        'community': 'community',
        'experience/device': 'experienceDevice',
        'experience/:id': 'experienceRoom',
        'experience': 'experience',
        '*notfound': 'notfound'
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

    experience: function () {
        var view = new app.Views.ExperienceEnter();
        app.instance.goto(view);
    },

    experienceDevice: function () {
        var view = new app.Views.ExperienceDevice();
        app.instance.goto(view);
    },

    experienceRoom: function (id) {
        id = id.toUpperCase();
        if (/^[A-Z0-9]{4}$/.test(id)) {
            console.log('ENTER ROOM ID ' + id);
        } else {
            var view = new app.Views.ExperienceEnter();
            app.instance.goto(view);
        }
    },

    notfound: function (notfound) {
        var view = new app.Views.NotFound();
        app.instance.goto(view);
    }
});
