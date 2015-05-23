var browserSync = require('browser-sync');
var gulp        = require('gulp');
var config      = require('../config/videos');

gulp.task('videos', function() {
    return gulp.src(config.src)
        .pipe(gulp.dest(config.dest))
        .pipe(browserSync.reload({ stream: true }));
});
