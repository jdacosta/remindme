var config = require('./');

module.exports = {
    server: {
        baseDir: config.publicDirectory
    }
    //proxy: config.devServerURL
};
