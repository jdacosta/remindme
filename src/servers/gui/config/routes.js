// load all modules
var Static = require('./static');

// API server endpoints
exports.endpoints = [

    // --- static ---
    { method: 'GET', path: '/{static*}', config: Static.get }

];
