var gulp = require('gulp');

// Requires the gulp-sass plugin
var sass = require('gulp-sass');

gulp.task('sass', function(){
    return gulp.src('css/style.scss')
      .pipe(sass()) // Using gulp-sass
      .pipe(gulp.dest('css'))
});

gulp.task('watch', function(){
    gulp.watch('css/**/*.scss', ['sass']); 
    // Other watchers
})