var gulp         = require('gulp');
var gulpSequence = require('gulp-sequence');

gulp.task('build:development', function (callback) {
    gulpSequence(
        'clean',
        ['icons', 'images', 'videos', 'sounds', 'fonts'],
        ['sass', 'browserify-desktop', 'browserify-mobile', 'html', 'server'],
        ['watch', 'browser-sync'],
        callback
    );
});
