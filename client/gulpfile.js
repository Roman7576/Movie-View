const gulp = require('gulp')
const sass = require('gulp-sass')
const less = require('gulp-less')
const concat = require('gulp-concat')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')
const cleanCss = require('gulp-clean-css')
const browserSync = require('browser-sync').create()

gulp.task('less', () =>
{
    gulp.src('./src/styles/**/*.less')
    	.pipe(sourcemaps.init())
        .pipe(less())
    	.pipe(autoprefixer())
        .pipe(concat('bundle.css'))
        .pipe(sourcemaps.write())
        .pipe(cleanCss())
        .pipe(gulp.dest('./public/styles'))
        .pipe(browserSync.stream())
})

gulp.task('serve', ()=>{
	browserSync.init({
		server: {
			baseDir: './public'
		}
	})

	gulp.watch('src/styles/**/*.less', ['less'])
	gulp.watch('public/*.html').on('change', browserSync.reload)
})

gulp.task('default', ['less', 'serve'])
