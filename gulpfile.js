'use strict';
const gulp = require('gulp');
const del = require('del');
// Basic
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
// Sass
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
// JS
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
// HTML
const htmlmin = require('gulp-html-minifier');

gulp.task('kill', function() {
  return del('app');
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
    .pipe(sourcemaps.write('.'))
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

gulp.task('watch', function() {
  gulp.watch('src/js/*.js', gulp.series('js'));
  gulp.watch('src/sass/*.scss', gulp.series('sass'));
  gulp.watch('src/*.html', gulp.series('sass'));
});

// Dev-сборка
gulp.task('dev', gulp.series('kill', gulp.parallel('html', 'js', 'sass'), 'watch'));
// Production-сборка
gulp.task('prod', gulp.series('kill', gulp.parallel('html', 'js')));