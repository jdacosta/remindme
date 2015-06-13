// load all modules
var StaticDesktop = require('./static-desktop');
var StaticMobile  = require('./static-mobile');

// API server endpoints
exports.endpoints = [

    // --- mobile ---
    { method: 'GET', path: '/m/{static*}', config: StaticMobile.get },

    // --- desktop ---
    { method: 'GET', path: '/{static*}', config: StaticDesktop.get }

];
