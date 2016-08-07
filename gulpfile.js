'use strict';
var gulp             = require('gulp');
var sass             = require('gulp-sass');
var sourcemaps       = require('gulp-sourcemaps');
var pug              = require('gulp-pug');
var autoprefixer     = require('gulp-autoprefixer');
var browserSync      = require('browser-sync');
var reload           = browserSync.reload;
var nodemon          = require('gulp-nodemon');

gulp.task('default', ['browser-sync', 'watch', 'styles', 'views']);

/*
	Nodemon
*/
gulp.task('nodemon', function (cb) {
	var started      = false;
	return nodemon({
		script: 'app.js'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started  = true;
		}
	});
});

/*
    Styles
*/
gulp.task('styles', function() {
    return gulp
        .src('./styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer())
        .pipe(gulp.dest('./public/css'))
        .pipe(reload({stream:true}));
});

/*
	Views
*/
gulp.task('views', function() {
	return gulp
		.src('./views/*/**.pug')
		.pipe(pug())
		.pipe(gulp.dest('./public/views'))
		.pipe(reload({stream:true}));
});

/*
    Browser Sync
*/
gulp.task('browser-sync', ['nodemon'], function() {
    browserSync.init(null, {
		proxy: 'http://localhost:5000',
        files: ['public/**/*.*'],
        browser: 'google chrome',
        port: 7000,
	});
});

function handleErrors() {
    var args         = Array.prototype.slice.call(arguments);
    notify.onError({
        title: 'Compile Error',
        message: '<% = error.message %>'
    }).apply(this, args);
    this.emit('end'); // Keep gulp from hanging on this task
}

gulp.task('watch', function() {
	gulp.watch('./styles/**/*.scss', ['styles']);
	gulp.watch('./views/**/*.pug', ['views']);
});
