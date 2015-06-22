var Backbone = require('backbone');

module.exports = Backbone.Router.extend({

    routes: {
        '': 'experience',
        'about': 'about',
        'community': 'community',
        'community/challenge': 'communityChallenge',
        'experience/challenge': 'experienceChallenge',
        'experience/device': 'experienceDevice',
        'experience/exit': 'experienceExit',
        'experience/home': 'experienceHome',
        'experience/load': 'experienceLoading',
        'experience/statistics': 'experienceStatistics',
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

    communityChallenge: function () {
        var view = new app.Views.CommunityChallenge();
        app.instance.goto(view);
    },

    experience: function () {
        if (!app.Config.socket.mobileConnected) {
            var view = new app.Views.ExperienceEnter();
            app.instance.goto(view);
        } else {
            var view = new app.Views.ExperienceLoading();
            app.instance.goto(view);
        }
    },

    experienceChallenge: function () {
        var view = new app.Views.ExperienceChallenge();
        app.instance.goto(view);
    },

    experienceDevice: function () {
        var view = new app.Views.ExperienceDevice();
        app.instance.goto(view);
    },

    experienceExit: function () {
        var view = new app.Views.ExperienceExit();
        app.instance.goto(view);
    },

    experienceHome: function () {
        var view = new app.Views.ExperienceHome();
        app.instance.goto(view);
    },

    experienceLoading: function () {
        var view = new app.Views.ExperienceLoading();
        app.instance.goto(view);
    },

    experienceStatistics: function () {
        var view = new app.Views.ExperienceStatistics();
        app.instance.goto(view);
    },

    notfound: function (notfound) {
        var view = new app.Views.ExperienceEnter();
        app.instance.goto(view);
    }
});
