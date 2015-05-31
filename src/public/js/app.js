window.app = {
    Collections: {},
    Extensions: {},
    Models: {},
    Views: {},
    Router: {},

    init: function () {
        this.instance = new app.Views.Remindme();
        new app.Router();
    }
};

// collections
app.Collections.Experience = require('./collections/experience');

// models
app.Models.Experience = require('./models/experience');

// extensions
app.Extensions.View = require('./extensions/view');

// views
app.Views.Remindme          = require('./views/remindme');
app.Views.About             = require('./views/about');
app.Views.Community         = require('./views/community');
app.Views.ExperienceDevice  = require('./views/experience-device');
app.Views.ExperienceEnter   = require('./views/experience-enter');
app.Views.ExperienceHome    = require('./views/experience-home');
app.Views.ExperienceLoading = require('./views/experience-loading');
app.Views.NotFound          = require('./views/notfound');

// routers
app.Router = require('./routers/router');

// launch app
app.init();
