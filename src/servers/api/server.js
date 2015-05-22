var Hapi   = require('hapi'),
    Routes = require('./config/routes'),
    Db     = require('./config/db'),
    Config = require('./config/config');

var app = {};
app.config = Config;

var server = new Hapi.Server();
server.connection({
    port: parseInt( process.env.PORT, 10 ) || app.config.server.port,
    host: app.config.server.host
});

server.register([
    {
        register: require('good'),
        options: {
            opsInterval: 1000,
            reporters: [{
                reporter: require('good-console'),
                events: {
                    ops: '*',
                    request: '*',
                    log: '*',
                    response: '*',
                    error: '*'
                }
            }]
        }
    },
    {
        register: require('hapi-cache-buster'),
        options: {
            version: 1
        }
    }
], function (error) {
    if (error) {
        console.error(error);
    } else {
        server.route(Routes.endpoints);

        server.start(function () {
            console.log('Server started at: ' + server.info.uri);
        });
    }
});
