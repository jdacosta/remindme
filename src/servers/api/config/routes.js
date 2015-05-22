// load all modules
var User   = require('./controller/user');

// API server endpoints
exports.endpoints = [

    // --- user ---
    { method: 'POST', path: '/user', config: User.create },
    { method: 'GET', path: '/user', config: User.getAll },
    { method: 'GET', path: '/user/{userId}', config: User.getOne },
    { method: 'PUT', path: '/user/{userId}', config: User.update },
    { method: 'DELETE', path: '/user/{userId}', config: User.remove },
    { method: 'DELETE', path: '/user', config: User.removeAll }
];