let gulp = require('gulp');
let imagemin = require('gulp-imagemin');
let webp = require('gulp-webp');
gulp.task('images', function(){
    return gulp.src(__dirname + '/public/img/src/*.jpg')
    // .pipe(imagemin([imagemin.jpegtran({progressive: true})]))
    .pipe(webp())
    .pipe(gulp.dest(__dirname+'/public/img'));
})