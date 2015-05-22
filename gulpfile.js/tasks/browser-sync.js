var browserSync = require('browser-sync');
var gulp        = require('gulp');
var config      = require('../config/browser-sync');

gulp.task('browser-sync', function () {
    return browserSync(config);
});
