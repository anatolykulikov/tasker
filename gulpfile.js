'use strict';
const gulp = require('gulp');
const del = require('del');
// Basic
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
// Sass
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const cleanCSS = require('gulp-clean-css');
// JS
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
// HTML
const htmlmin = require('gulp-html-minifier');

var state = '';

gulp.task('kill', function() {
  return del('app');
});

gulp.task('img', function() {
  return gulp.src('src/img/*.*')
      .pipe(gulp.dest('app/content/img'));
});

gulp.task('html', function() {
  return gulp.src('src/*.html')
      .pipe(htmlmin({
          collapseWhitespace: true
      }))
      .pipe(gulp.dest('app'));
});

gulp.task('sass', function () {
  return gulp.src('src/sass/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('app/content'));
});
gulp.task('sass-prod', function () {
  return gulp.src('src/sass/app.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest('app/content'));
});

gulp.task('js', function() {
  return gulp.src('src/js/*.js')
      .pipe(sourcemaps.init())
          .pipe(concat('app.js'))
          .pipe(babel({
              presets: ['@babel/env']
          }))
          .pipe(uglify())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('app/content/'));
});
gulp.task('js-prod', function() {
  return gulp.src('src/js/*.js')
      .pipe(concat('app.js'))
      .pipe(babel({
        presets: ['@babel/env']
      }))
      .pipe(uglify())
      .pipe(gulp.dest('app/content/'));
});

gulp.task('watch', function() {
  gulp.watch('src/js/*.js', gulp.series('js'));
  gulp.watch('src/sass/*.scss', gulp.series('sass'));
  gulp.watch('src/*.html', gulp.series('html'));
});

// Dev-сборка
gulp.task('dev', gulp.series('kill', gulp.parallel('html', 'js', 'sass', 'img'), 'watch'));
// Production-сборка
gulp.task('prod', gulp.series('kill', gulp.parallel('html', 'sass-prod', 'img', 'js-prod')));