const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const sassGlob = require('gulp-sass-glob');
const sourcemaps = require('gulp-sourcemaps');
const csso = require('gulp-csso');
const autoprefixer = require('gulp-autoprefixer');
const htmlmin = require('gulp-htmlmin');
const uglifyJS = require('gulp-uglify-es').default;
const del = require('del');
const ts = require('gulp-typescript');

const tsProject = ts.createProject('tsconfig.json');

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
        cascade: false,
        remove: false
      })
    )
    .pipe(csso())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/css/'))
    .pipe(reload({ stream: true }));
});

gulp.task('html', () => {
  gulp
    .src('src/*.html')
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true
      })
    )
    .pipe(gulp.dest('dist'))
    .pipe(reload({ stream: true }));
});

gulp.task('scripts', () => {
  gulp
    .src('src/js/**/*.ts')
    .pipe(tsProject())
    .pipe(uglifyJS())
    .pipe(gulp.dest('./dist/js'))
    .pipe(reload({ stream: true }));
});

gulp.task('watch', () => {
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('src/**/**/*.scss', ['sass']);
  gulp.watch('src/**/*.ts', ['scripts']);
});

gulp.task('img', () => {
  gulp
    .src('src/img/**/*')
    .pipe(gulp.dest('./dist/img'))
    .pipe(reload({ stream: true }));
});

gulp.task('files', () => {
  gulp.src('src/files/**/*').pipe(gulp.dest('./dist/files'));
});

gulp.task('clean', () => del(['dist']));

gulp.task('default', ['sass', 'html', 'scripts', 'img', 'files', 'server', 'watch']);
