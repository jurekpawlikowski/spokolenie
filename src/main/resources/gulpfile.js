const gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('browserSync', () => {
  browserSync.init( {
      server: {
          baseDir: './templates/'
      },
  })
})
gulp.task('sass', () => {
  return gulp.src('static/sass/**/*.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('static/styles/'))
    .pipe(browserSync.reload({
      stream: true
    }))
});
gulp.task('watch', ['browserSync', 'sass'], () => {
  gulp.watch('static/sass/**/*.scss', ['sass']);
  gulp.watch('**/*.html', browserSync.reload);
  gulp.watch('static/js/*.js', browserSync.reload);
});
gulp.task('clean:dist', () => {
  return del.sync('dist');
})
gulp.task('default', function (callback) {
  runSequence(['watch', 'sass', 'browserSync'],
    callback
  )
})