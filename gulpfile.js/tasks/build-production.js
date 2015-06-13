var gulp         = require('gulp');
var gulpSequence = require('gulp-sequence');

gulp.task('build:production', function (callback) {
    process.env.NODE_ENV = 'production';
    gulpSequence(
        'clean',
        ['icons', 'images', 'videos', 'sounds', 'fonts', 'data'],
        ['sass', 'browserify-desktop', 'browserify-mobile', 'html', 'server'],
        callback
    );
});
