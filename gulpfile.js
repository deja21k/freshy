var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var rucksack = require('rucksack-css');
var mqpacker                    = require('css-mqpacker');
var browserSync = require('browser-sync').create();

gulp.task('sass', function () {

  var processors = [
        autoprefixer(),
        rucksack({
          fallbacks: true,
        }),
        mqpacker,
    ];

  return gulp.src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(postcss(processors))
    .pipe(sourcemaps.write('/.'))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('browsy',function () {
  // Static Server + watching scss/html files
    browserSync.init({
        server: "./dist"
    });

    gulp.watch('./src/scss/**/*.scss', ['sass'])
    gulp.watch('./dist/css/*.css').on('change', browserSync.reload);
    gulp.watch("./dist/**/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['sass', 'browsy']);
