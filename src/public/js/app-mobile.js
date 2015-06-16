window.app = {
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
        app.Config.urlDesktop = 'http://remindme.fr/';
        app.Config.urlMobile  = 'http://remindme.fr/m/';
        app.Config.socket = {
            url: 'http://192.168.31.19:1338',
            connectionId: '',
            mySocketId: ''
        };

        // remindme app
        this.instance = new app.Views.Remindme();
        new app.Router();

        // events
        new app.Utils.BrainManager();
        new app.Utils.MobileManager();
        new app.Utils.SliderManager();
    }
};

// extensions
app.Extensions.View  = require('./extensions/view');

// views
app.Views.Remindme   = require('./views/remindme');
app.Views.About      = require('./views/mobile/about');
app.Views.Experience = require('./views/mobile/experience');
app.Views.Tutorial   = require('./views/mobile/tutorial');

// routers
app.Router = require('./routers/router-mobile');

// utils
app.Utils.BrainManager  = require('./utils/brain-manager');
app.Utils.MobileManager = require('./utils/mobile-manager');
app.Utils.SliderManager = require('./utils/slider-manager');

// launch app
app.init();
