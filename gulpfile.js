const gulp = require('gulp');
const imageMin = require('gulp-imagemin');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

/*
    -- Top Level Functions --
    gulp.task - Define tasks
    gulp.src - Point to files to use
    gulp.dest - Points to folder tou output
    gulp.watch - watch files & folders for changes
*/

/// Message Output
gulp.task('message', function() {
    return console.log(`Gulp is running`);
});

/// Optimize Images
gulp.task('imageMin', () =>
    gulp.src('src/images/*').pipe(imageMin()).pipe(gulp.dest('public/images'))
);

gulp.task('sass', function() {
    gulp.src("src/sass/style.scss").pipe(sass().on("error", sass.logError)).pipe(gulp.dest('public/stylesheets'))
});

/// Concatenate & Minify Javascripts
gulp.task('scripts', function() {
    gulp.src("src/javascripts/*.js")
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('public/javascripts'))
});

gulp.task('default', ['message', 'imageMin', 'sass', 'scripts']);

gulp.task('watch', function() {
    gulp.watch('src/javascripts/*.js', ['scripts']);
    gulp.watch('src/images/*', ['imageMin']);
    gulp.watch('src/sass/*.scss', ['sass']);
});
