window.app = {
    Collections: {},
    Extensions: {},
    Models: {},
    Views: {},
    Router: {},
    Utils: {},

    init: function () {
        this.instance = new app.Views.Remindme();
        new app.Router();

        // events
        new app.Utils.DisplayElements();
        new app.Utils.Fullscreen();
        new app.Utils.HeaderNavigation();
    }
};

// collections
app.Collections.Experience = require('./collections/experience');

// models
app.Models.Experience = require('./models/experience');

// extensions
app.Extensions.View       = require('./extensions/view');

// views
app.Views.Remindme             = require('./views/remindme');
app.Views.About                = require('./views/about');
app.Views.Community            = require('./views/community');
app.Views.ExperienceChallenge  = require('./views/experience-challenge');
app.Views.ExperienceDevice     = require('./views/experience-device');
app.Views.ExperienceEnter      = require('./views/experience-enter');
app.Views.ExperienceExit       = require('./views/experience-exit');
app.Views.ExperienceHome       = require('./views/experience-home');
app.Views.ExperienceLoading    = require('./views/experience-loading');
app.Views.ExperienceStatistics = require('./views/experience-statistics');
app.Views.NotFound             = require('./views/notfound');

// routers
app.Router = require('./routers/router');

// utils
app.Utils.DisplayElements  = require('./utils/display-elements');
app.Utils.Fullscreen       = require('./utils/fullscreen');
app.Utils.HeaderNavigation = require('./utils/header-navigation');

// launch app
app.init();
