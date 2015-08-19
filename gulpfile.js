var gulp   = require('gulp'),
	rename = require('gulp-rename'),
	babel  = require('gulp-babel'),
	uglify = require('gulp-uglify');

gulp.task('main', function () {
	return gulp.src('index.js')
		.pipe(babel({ modules: 'common' }))
		.pipe(rename('gulp-name-modules.js'))
		.pipe(gulp.dest('dist'));
});

gulp.task('minify', ['main'], function () {
	return gulp.src('dist/gulp-name-modules.js')
		.pipe(uglify())
		.pipe(rename('gulp-name-modules.min.js'))
		.pipe(gulp.dest('dist'));
})

gulp.task('default', ['main', 'minify']);