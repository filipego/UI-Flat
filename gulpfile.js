var gulp = require('gulp'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    compass = require('gulp-compass'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),
    server = lr();

var coffeeSources = [
  'components/coffee/*.coffee'
];

var jsSources = [
  'components/lib/jquery/jquery.js',
  'components/scripts/*.js'
];

var compassSources = [
  'components/sass/*.scss'
];

gulp.task('js', function() {
  gulp.src(jsSources)
          .pipe(uglify())
          .pipe(concat('script.js'))
          .pipe(gulp.dest('js'));
});

gulp.task('coffee', function() {
  gulp.src(coffeeSources)
    .pipe(coffee({ bare: true})
      .on('error', gutil.log))
    .pipe(gulp.dest('components/scripts'))
});

gulp.task('compass', function() {
    gulp.src(compassSources)
        .pipe(compass({
            css: 'css',
            sass: 'components/sass',
        }))
        .pipe(gulp.dest('css'));
});

gulp.task('watch', function() {
  var server = livereload();
  gulp.watch(jsSources, ['js']);
  gulp.watch(coffeeSources, ['coffee']);
  gulp.watch(compassSources, ['compass']);
  gulp.watch(['js/script.js', '*.html'], function(e) {
    server.changed(e.path);
  });
});

gulp.task('default', ['compass', 'js', 'coffee', 'watch']);

