var gulp = require('gulp');  
var browserify = require('browserify');  
var reactify = require('reactify')
var del = require('del');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');


/* remove build dir */
gulp.task('clean', function(done) {
    console.log('Cleaning ...')
    del(['static/build'], done);
});


/* sass */
gulp.task('sass', function() {
    gulp.src('./bs/static/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./bs/static/css'));
})


/* browserify to create app bundle */
gulp.task('scripts', ['clean'], function() {
    browserify({
        debug: true,
        entries: ['./bs/static/js/app.jsx']
    })
        .transform(reactify)
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('bs/static/build'))
});


/**
 * Boot the watcher
 */

gulp.task('default', ['scripts', 'sass'], function() {
    gulp.watch('./bs/static/**/*.js*', ['scripts']);
    gulp.watch('./bs/static/scss/*.scss', ['sass']);
})
