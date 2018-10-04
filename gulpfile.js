var gulp = require('gulp');
var zip = require('gulp-zip');

gulp.task('zip', function(){
	return gulp.src('src/*').pipe(zip('cedric.zip')).pipe(gulp.dest('../cedric/'))
});

gulp.task('default', ['zip']);
