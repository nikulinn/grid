'use strict';

var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    postcss      = require('gulp-postcss'),
    cssnano      = require('gulp-cssnano'),
    autoprefixer = require('autoprefixer'),
    browserSync  = require('browser-sync').create();
// VARIABLES
var cssSrc = './css/styles.scss';
var cssDest = './build/css';
// SASS
gulp.task('sass-compile', function() {
    return gulp.src(cssSrc)
        .pipe(sass().on('error', sass.logError))
        // .pipe(postcss([ autoprefixer({ browsers: ['> 1%', 'last 2 versions', 'iOS 8', 'iOS 7', 'ie 11', 'Safari 9'] }) ]))
        .pipe(cssnano())
        .pipe(gulp.dest(cssDest))
        .pipe(browserSync.stream());
});
// BROWSERSYNC & WATCH
gulp.task('browser-sync', ['sass-compile'], function() {
    browserSync.init({
        server: "./"
    });
    gulp.watch('./scss/*.scss', ['sass-compile']);
    gulp.watch(['*.html'], browserSync.reload);
});
// DEFAULT
gulp.task('default', ['browser-sync']);
