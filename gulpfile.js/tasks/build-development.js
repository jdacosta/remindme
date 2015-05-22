var gulp         = require('gulp');
var gulpSequence = require('gulp-sequence');

gulp.task('build:development', function (callback) {
    gulpSequence(
        'clean',
        ['icons', 'images', 'fonts'],
        ['sass', 'browserify', 'html', 'server'],
        ['watch', 'browser-sync'],
        callback
    );
});
