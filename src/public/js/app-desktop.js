window.app = {
    Classes: {},
    Collections: {},
    Config: {},
    Extensions: {},
    Models: {},
    Views: {},
    Router: {},
    Utils: {},

    init: function () {

        // config
        app.Config.currentStep = 1;
        app.Config.urlDesktop = 'http://192.168.31.19:1338/';
        app.Config.urlMobile  = 'http://192.168.31.19:1338/m/';
        app.Config.socket = {
            url: 'http://192.168.31.19:1338',
            connectionId: ''
        };

        // remindme app
        this.instance = new app.Views.Remindme();
        new app.Router();

        // events
        app.Classes.DesktopManager    = new app.Utils.DesktopManager();
        app.Classes.FullscreenManager = new app.Utils.FullscreenManager();
        app.Classes.HeaderManager     = new app.Utils.HeaderManager();
        app.Classes.ImmersiveManager  = new app.Utils.ImmersiveManager();
        app.Classes.SoundsManager     = new app.Utils.SoundsManager();
        app.Classes.SVGManager        = new app.Utils.SVGManager();
        app.Classes.VideosManager     = new app.Utils.VideosManager();
        app.Classes.WebcamManager     = new app.Utils.WebcamManager();
    }
};

// collections
//app.Collections.ExperienceDevice = require('./collections/experience-device');

// models
//app.Models.ExperienceDevice = require('./models/experience-device');

// extensions
app.Extensions.View       = require('./extensions/view');

// views
app.Views.Remindme             = require('./views/remindme');
app.Views.About                = require('./views/desktop/about');
app.Views.Community            = require('./views/desktop/community');
app.Views.ExperienceChallenge  = require('./views/desktop/experience-challenge');
app.Views.ExperienceDevice     = require('./views/desktop/experience-device');
app.Views.ExperienceEnter      = require('./views/desktop/experience-enter');
app.Views.ExperienceExit       = require('./views/desktop/experience-exit');
app.Views.ExperienceHome       = require('./views/desktop/experience-home');
app.Views.ExperienceLoading    = require('./views/desktop/experience-loading');
app.Views.ExperienceStatistics = require('./views/desktop/experience-statistics');

// routers
app.Router = require('./routers/router-desktop');

// utils
app.Utils.DesktopManager    = require('./utils/desktop-manager');
app.Utils.FullscreenManager = require('./utils/fullscreen-manager');
app.Utils.HeaderManager     = require('./utils/header-manager');
app.Utils.ImmersiveManager  = require('./utils/immersive-manager');
app.Utils.SoundsManager     = require('./utils/sounds-manager');
app.Utils.SVGManager        = require('./utils/svg-manager');
app.Utils.VideosManager     = require('./utils/videos-manager');
app.Utils.WebcamManager     = require('./utils/webcam-manager');

// launch app
app.init();
