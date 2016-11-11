'use strict';

var gulp     = require('gulp');
var concat   = require('gulp-concat');
var uglify   = require('gulp-uglify');
var header   = require('gulp-header');
var rename   = require('gulp-rename');
var moment   = require('moment');
var pkg      = require('./package.json');
var sass     = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');

// js
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
gulp.task('jstest',function(){
	return gulp.src(['src/js/test/*.js'])
		.pipe(concat('test.js'))
		.pipe(uglify())
		.pipe(rename(pkg.prefix + '_test.min.js')) // 在流中将文件改名
		.pipe(header('/* Build by ' + pkg.author + ' ' + moment().format('YYYY/MM/DD HH:mm:ss') + ' */\n'))
		.pipe(gulp.dest('advanced/frontend/web/build/js'));
});
gulp.task('jslist',function(){
	return gulp.src(['src/js/list/*.js'])
		.pipe(concat('list.js'))
		.pipe(uglify())
		.pipe(rename(pkg.prefix + '_list.min.js')) // 在流中将文件改名
		.pipe(header('/* Build by ' + pkg.author + ' ' + moment().format('YYYY/MM/DD HH:mm:ss') + ' */\n'))
		.pipe(gulp.dest('advanced/frontend/web/build/js'));
});
// css
gulp.task('csslibs',function(){
	return gulp.src(['src/css/libs/*.scss'])
		.pipe(concat('libs.css'))
		.pipe(sass().on('error', sass.logError))
		.pipe(cleanCSS())
		.pipe(rename(pkg.prefix + '_libs.min.css')) // 在流中将文件改名
		.pipe(header('/* Build by ' + pkg.author + ' ' + moment().format('YYYY/MM/DD HH:mm:ss') + ' */\n'))
		.pipe(gulp.dest('advanced/frontend/web/build/css'))
})
gulp.task('cssshow',function(){
	return gulp.src(['src/css/show/*.scss'])
		.pipe(concat('show.css'))
		.pipe(sass().on('error', sass.logError))
		.pipe(cleanCSS())
		.pipe(rename(pkg.prefix + '_show.min.css')) // 在流中将文件改名
		.pipe(header('/* Build by ' + pkg.author + ' ' + moment().format('YYYY/MM/DD HH:mm:ss') + ' */\n'))
		.pipe(gulp.dest('advanced/frontend/web/build/css'))
})
gulp.task('csslist',function(){
	return gulp.src(['src/css/list/*.scss'])
		.pipe(concat('list.css'))
		.pipe(sass().on('error', sass.logError))
		.pipe(cleanCSS())
		.pipe(rename(pkg.prefix + '_list.min.css')) // 在流中将文件改名
		.pipe(header('/* Build by ' + pkg.author + ' ' + moment().format('YYYY/MM/DD HH:mm:ss') + ' */\n'))
		.pipe(gulp.dest('advanced/frontend/web/build/css'))
})