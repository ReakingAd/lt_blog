/**
 * @desc 
 * @example 
 * 		gulp csslibs;gulp html      构建libs的样式文件。两个任务都要执行，否则会由于缓存导致用户看不到更新
 * 		gulp jslibs;gulp html       构建libs的javascript脚本文件。两个任务都要执行，否则会由于缓存导致用户看不到更新
 */
'use strict';

const gulp         = require('gulp');
const concat       = require('gulp-concat');
const uglify       = require('gulp-uglify');
const header       = require('gulp-header');
const rename       = require('gulp-rename');
const moment       = require('moment');
const pkg          = require('./package.json');
const sass         = require('gulp-sass');
const cleanCSS     = require('gulp-clean-css');
const rev          = require('gulp-rev');
const revCollector = require('gulp-rev-collector');
const minifyHTML   = require('gulp-minify-html');

// =============================== javasript ===========================================

gulp.task('jslibs',() => {
	return gulp.src('src/js/libs/*.js')
		.pipe( concat('libs.js') )
		.pipe( uglify({
			// mangle:true,  // 混淆变量名
			// preserveComments:'all', // all保留注释
		}))
		.pipe( rename(pkg.prefix + '-libs.min.js') )
		.pipe( header('/* Build by ' + pkg.author + ' ' + moment().format('YYYY/MM/DD HH:mm:ss') + ' */\n') )
		.pipe( rev() )
		.pipe( gulp.dest('advanced/frontend/web/build/js') )
		.pipe( rev.manifest() )
		.pipe( gulp.dest('rev/js/libs') );
});

gulp.task('jsglobal',() => {
	return gulp.src('src/js/global/*.js')
		.pipe( concat('global.js') )
		.pipe( uglify() )
		.pipe( rename(pkg.prefix + '-global.min.js') )
		.pipe( header('/* Build by ' + pkg.author + ' ' + moment().format('YYYY/MM/DD HH:mm:ss') + ' */\n') )
		.pipe( rev() )
		.pipe( gulp.dest('advanced/frontend/web/build/js') )
		.pipe( rev.manifest() )
		.pipe( gulp.dest('rev/js/global') );
});

gulp.task('jscreate',() => {
	return gulp.src( ['src/js/create/*.js'] )
		.pipe( concat('create.js') )
		.pipe( uglify() )
		.pipe( rename(pkg.prefix + '-create.min.js') )
		.pipe( header('/* Build by ' + pkg.author + ' ' + moment().format('YYYY/MM/DD HH:mm:ss') + ' */\n') )
		.pipe( rev() )
		.pipe( gulp.dest('advanced/frontend/web/build/js') )
		.pipe( rev.manifest() )
		.pipe( gulp.dest('rev/js/create') );
});

gulp.task('jsshow',() => {
	return gulp.src( ['src/js/show/*.js'] )
		.pipe( concat('show.js') )
		// .pipe( uglify() )
		.pipe( rename(pkg.prefix + '-show.min.js') )
		.pipe( header('/* Build by ' + pkg.author + ' ' + moment().format('YYYY/MM/DD HH:mm:ss') + ' */\n') )
		.pipe( rev() )
		.pipe( gulp.dest('advanced/frontend/web/build/js') )
		.pipe( rev.manifest() )
		.pipe( gulp.dest('rev/js/show') );
});

gulp.task('jstest',() => {
	return gulp.src( ['src/js/test/*.js'] )
		.pipe( concat('test.js') )
		.pipe( uglify() )
		.pipe( rename(pkg.prefix + '-test.min.js') )
		.pipe( header('/* Build by ' + pkg.author + ' ' + moment().format('YYYY/MM/DD HH:mm:ss') + ' */\n') )
		.pipe( rev() )
		.pipe( gulp.dest('advanced/frontend/web/build/js') )
		.pipe( rev.manifest() )
		.pipe( gulp.dest('rev/js/test') );
});

gulp.task('jslist',() => {
	return gulp.src( ['src/js/list/*.js'] )
		.pipe( concat('list.js') )
		// .pipe( uglify() )
		.pipe( rename(pkg.prefix + '-list.min.js') )
		.pipe( header('/* Build by ' + pkg.author + ' ' + moment().format('YYYY/MM/DD HH:mm:ss') + ' */\n') )
		.pipe( rev() )
		.pipe( gulp.dest('advanced/frontend/web/build/js') )
		.pipe( rev.manifest() )
		.pipe( gulp.dest('rev/js/list') );
});

gulp.task('jshome',() => {
	return gulp.src( ['src/js/homepage/*.js'] )
		.pipe( concat('homepage.js') )
		.pipe( uglify() )
		.pipe( rename(pkg.prefix + '-homepage.min.js') )
		.pipe( header('/* Build by ' + pkg.author + ' ' + moment().format('YYYY/MM/DD HH:mm:ss') + ' */\n') )
		.pipe( rev() )
		.pipe( gulp.dest('advanced/frontend/web/build/js') )
		.pipe( rev.manifest() )
		.pipe( gulp.dest('rev/js/homepage') );
});

// =============================== css ===========================================

gulp.task('csslibs',() => {
	return gulp.src( ['src/css/libs/*.scss'] )
		.pipe( concat('libs.css') )
		.pipe( sass().on('error', sass.logError) )
		.pipe( cleanCSS() )
		.pipe( rename(pkg.prefix + '-libs.min.css') )
		.pipe( header('/* Build by ' + pkg.author + ' ' + moment().format('YYYY/MM/DD HH:mm:ss') + ' */\n') )
		.pipe( rev() )
		.pipe( gulp.dest('advanced/frontend/web/build/css') )
		.pipe( rev.manifest() )
		.pipe( gulp.dest('rev/css/libs') );
});

gulp.task('cssshow',() => {
	return gulp.src( ['src/css/show/*.scss'] )
		.pipe( concat('show.css') )
		.pipe( sass().on('error', sass.logError) )
		.pipe( cleanCSS() )
		.pipe( rename(pkg.prefix + '-show.min.css') )
		.pipe( header('/* Build by ' + pkg.author + ' ' + moment().format('YYYY/MM/DD HH:mm:ss') + ' */\n') )
		.pipe( rev() )
		.pipe( gulp.dest('advanced/frontend/web/build/css') )
		.pipe( rev.manifest() )
		.pipe( gulp.dest('rev/css/show') );
});

gulp.task('csslist',() => {
	return gulp.src( ['src/css/list/*.scss'] )
		.pipe( concat('list.css') )
		.pipe( sass().on('error', sass.logError) )
		.pipe( cleanCSS() )
		.pipe( rename(pkg.prefix + '-list.min.css') )
		.pipe( header('/* Build by ' + pkg.author + ' ' + moment().format('YYYY/MM/DD HH:mm:ss') + ' */\n') )
		.pipe( rev() )
		.pipe( gulp.dest('advanced/frontend/web/build/css') )
		.pipe( rev.manifest() )
		.pipe( gulp.dest('rev/css/list') );
});

gulp.task('cssglobal',() => {
	return gulp.src( ['src/css/global/*.scss'] )
		.pipe( concat('global.css') )
		.pipe( sass().on('error', sass.logError) )
		.pipe( cleanCSS() )
		.pipe( rename(pkg.prefix + '-global.min.css') )
		.pipe( header('/* Build by ' + pkg.author + ' ' + moment().format('YYYY/MM/DD HH:mm:ss') + ' */\n') )
		.pipe( rev() )
		.pipe( gulp.dest('advanced/frontend/web/build/css') )
		.pipe( rev.manifest() )
		.pipe( gulp.dest('rev/css/global') );
});

gulp.task('csshome',() => {
	return gulp.src( ['src/css/homepage/*.scss'] )
		.pipe( concat('homepage.css') )
		.pipe( sass().on('error', sass.logError) )
		.pipe( cleanCSS() )
		.pipe( rename(pkg.prefix + '-homepage.min.css') )
		.pipe( header('/* Build by ' + pkg.author + ' ' + moment().format('YYYY/MM/DD HH:mm:ss') + ' */\n') )
		.pipe( rev() )
		.pipe( gulp.dest('advanced/frontend/web/build/css') )
		.pipe( rev.manifest() )
		.pipe( gulp.dest('rev/css/homepage') );
});

gulp.task('cssshare',() => {
	return gulp.src( ['src/css/share/*.scss'] )
		.pipe( concat('homepage.css') )
		.pipe( sass().on('error', sass.logError) )
		.pipe( cleanCSS() )
		.pipe( rename(pkg.prefix + '-share.min.css') )
		.pipe( header('/* Build by ' + pkg.author + ' ' + moment().format('YYYY/MM/DD HH:mm:ss') + ' */\n') )
		.pipe( rev() )
		.pipe( gulp.dest('advanced/frontend/web/build/css') )
		.pipe( rev.manifest() )
		.pipe( gulp.dest('rev/css/share') );
});

gulp.task('cssaboutme',() => {
	return gulp.src( ['src/css/aboutme/*.scss'] )
		.pipe( concat('homepage.css') )
		.pipe( sass().on('error', sass.logError) )
		.pipe( cleanCSS() )
		.pipe( rename(pkg.prefix + '-aboutme.min.css') )
		.pipe( header('/* Build by ' + pkg.author + ' ' + moment().format('YYYY/MM/DD HH:mm:ss') + ' */\n') )
		.pipe( rev() )
		.pipe( gulp.dest('advanced/frontend/web/build/css') )
		.pipe( rev.manifest() )
		.pipe( gulp.dest('rev/css/aboutme') );
});

/**
 * @desc 将rev/文件夹记录的文件名修改情况的json文件，找到视图文件中引用过他的views文件的<link>或<script>，将引用路径的文件名也修改。
 */
gulp.task('html', () => {
	return gulp.src( ['rev/**/**/*.json','templates/**/*.php'] )
		.pipe( revCollector({
			replaceReved:true
		}) )
		.pipe( gulp.dest('advanced/frontend/views') );
});