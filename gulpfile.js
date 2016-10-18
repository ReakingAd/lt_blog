'use strict';

var gulp   = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var header = require('gulp-header');
var rename = require('gulp-rename');
var moment = require('moment');
var pkg    = require('./package.json');

gulp.task('jslibs',function(){
	return gulp.src('src/js/libs/*.js')
		.pipe(concat('libs.js'))
		.pipe(uglify({
			// mangle:true,  // 混淆变量名
			// preserveComments:'all', // all保留注释
		}))
		.pipe(rename(pkg.prefix + '_libs.min.js'))
		.pipe(header('/* Build by ' + pkg.author + ' ' + moment().format('YYYY/MM/DD HH:mm:ss') + ' */\n'))
		.pipe(gulp.dest('advanced/frontend/web/build/js'));
});
gulp.task('jsglobal',function(){
	return gulp.src('src/js/global/*.js')
		.pipe(concat('global.js'))
		.pipe(uglify())
		.pipe(rename(pkg.prefix + '_global.min.js'))
		.pipe(header('/* Build by ' + pkg.author + ' ' + moment().format('YYYY/MM/DD HH:mm:ss') + ' */\n'))
		.pipe(gulp.dest('advanced/frontend/web/build/js'));
});
gulp.task('jshome',function(){
	return gulp.src(['src/js/home/*.js'])
		.pipe(concat('home.js'))
		.pipe(uglify())
		.pipe(rename(pkg.prefix + '_home.min.js')) // 在流中将文件改名
		.pipe(header('/* Build by ' + pkg.author + ' ' + moment().format('YYYY/MM/DD HH:mm:ss') + ' */\n'))
		.pipe(gulp.dest('advanced/frontend/web/build/js'));
});
gulp.task('jscreate',function(){
	return gulp.src(['src/js/create/*.js'])
		.pipe(concat('create.js'))
		.pipe(uglify())
		.pipe(rename(pkg.prefix + '_create.min.js')) // 在流中将文件改名
		.pipe(header('/* Build by ' + pkg.author + ' ' + moment().format('YYYY/MM/DD HH:mm:ss') + ' */\n'))
		.pipe(gulp.dest('advanced/frontend/web/build/js'));
});
gulp.task('jsshow',function(){
	return gulp.src(['src/js/show/*.js'])
		.pipe(concat('show.js'))
		.pipe(uglify())
		.pipe(rename(pkg.prefix + '_show.min.js')) // 在流中将文件改名
		.pipe(header('/* Build by ' + pkg.author + ' ' + moment().format('YYYY/MM/DD HH:mm:ss') + ' */\n'))
		.pipe(gulp.dest('advanced/frontend/web/build/js'));
});