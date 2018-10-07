const gulp = require('gulp'),
  fs = require('fs'),
  browserSync = require('browser-sync').create(),
  reload = browserSync.reload,
  sass = require('gulp-sass'),
  plumber = require('gulp-plumber'),
  sassGlob = require('gulp-sass-glob'),
  sourcemaps = require('gulp-sourcemaps'),
  csso = require('gulp-csso'),
  autoprefixer = require('gulp-autoprefixer'),
  htmlmin = require('gulp-htmlmin');

// server
gulp.task('server', function() {
  browserSync.init({
    open: false,
    notify: false,
    server: {
      baseDir: './dist'
    }
  });
});

gulp.task('sass', () => {
  return gulp
    .src('./src/styles/main.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ['last 2 version'],
        cascade: false
      })
    )
    .pipe(csso())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/css/'))
    .pipe(reload({ stream: true }));
});

gulp.task('html', () => {
  gulp
    .src('src/index.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('dist'))
    .pipe(reload({ stream: true }));
});

gulp.task('js', () => {
  gulp
    .src('src/js/*.js')
    .pipe(gulp.dest('./dist/js'))
    .pipe(reload({ stream: true }));
});

gulp.task('watch', () => {
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('src/**/**/*.scss', ['sass']);
  gulp.watch('src/**/*.js', ['js']);
});

gulp.task('img', () => {
  gulp
    .src('src/img/**/*')
    .pipe(gulp.dest('./dist/img'))
    .pipe(reload({ stream: true }))
});

gulp.task('files', () => {
  gulp
    .src('src/files/**/*')
    .pipe(gulp.dest('./dist/files'))
});

gulp.task('clean', () => del(['dist']));

gulp.task('default', ['sass', 'html', 'js', 'img', 'files', 'server', 'watch']);
