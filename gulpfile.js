const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const babelify = require('babelify');
const rename = require('gulp-rename');


gulp.task('pre-test', function() {

	//source code
	gulp.src('source/**/*.js')
		.pipe(babel())
		.pipe(gulp.dest('es5/source'));

	//tests
	gulp.src('tests/**/*.test.js')
		.pipe(babel())
		.pipe(gulp.dest('es5/tests'));
});

gulp.task('to-browser', ()=>{
	browserify('source/main.js')
	.transform('babelify', {
		presets: ['es2015']
	})
	.bundle()
	.pipe(source('main.js'))
	.pipe(buffer())
	.pipe(uglify())
	.pipe(rename('tic-tac-toe-ai-min.js'))
	.pipe(gulp.dest('distribution/'));
});
