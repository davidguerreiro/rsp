var gulp = require('gulp');

var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('sass', function(){
    return gulp.src('css/style.scss')
      .pipe(sass()) // Using gulp-sass
      .pipe(gulp.dest('css'))
});

gulp.task('watch', function(){
    gulp.watch('css/**/*.scss', ['sass']); 
    // Other watchers
});

//script paths
var jsFiles = 'js/game/*.js';
var jsDest = 'js';

gulp.task('scripts', function() {
return gulp.src(jsFiles)
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(jsDest));
});