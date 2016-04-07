/**
 *
 * Gulpfile
 *
 */

var prod = './public/', //production directory
		dev  = './source/'; //source directory

var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    jade = require('gulp-jade'),
    Filter = require('gulp-filter');


/**
 * Styles task
 */
gulp.task('styles',function(){
	var filter = Filter('**/*.styl',{restore:true});
	return gulp.src([
			//Bower components
			'bower_components/angular-ui-switch/angular-ui-switch.css',

			//Custom styles
			dev + 'styles/*.styl'
		])
		.pipe(filter)
		.pipe(stylus())
		.pipe(filter.restore)
		.pipe(concat('styles.css'))
		.pipe(minifycss({keepSpecialComments:0}))
		.pipe(gulp.dest(prod + 'css'))
		.pipe(notify({message:'Styles ready'}));
});


/**
 * Scripts task
 */
gulp.task('scripts',function(){
	return gulp.src([
			//Bower components
			'bower_components/angular-ui-switch/angular-ui-switch.js',
			'bower_components/angular-facebook/lib/angular-facebook.js',
			'bower_components/jsSHA/src/sha.js',
			//Custom scripts
			dev + 'scripts/**/*.js'
		])
		.pipe(concat('scripts.js'))
		.pipe(uglify())
		.pipe(gulp.dest(prod + 'js'))
		.pipe(notify({message:'Scripts ready'}));
});


/**
 * Views tasks
 */
gulp.task('templates', function() {
  return gulp.src([dev+'templates/*.jade',dev+'layouts/*.jade'])
    .pipe(jade())
    .pipe(gulp.dest(prod + 'html'))
		.pipe(notify({message:'Templates ready'}));
});
gulp.task('index', function() {
  return gulp.src(dev+'index.jade')
    .pipe(jade())
    .pipe(gulp.dest(prod))
		.pipe(notify({message:'index ready'}));
});


/**
 * Watch
 */
gulp.task('watch',function(){
 gulp.watch( dev+'styles/**/*.styl', ['styles'] );
 gulp.watch( dev+'scripts/**/*.js', ['scripts'] );
 gulp.watch( dev+'templates/**/*.jade', ['templates'] );
 gulp.watch( dev+'index.jade', ['index'] );
});


/**
 * Watch
 */
gulp.task('default',function(){
  gulp.start('styles'); 
  gulp.start('scripts');
  gulp.start('templates');
  gulp.start('index');
});
