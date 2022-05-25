 'use strict';
 var gulp = require('gulp');
 var rename = require("gulp-rename");
 var uglify = require('gulp-uglify');
 var gulpSvelte = require('gulp-svelte');
 var babel = require('gulp-babel');

 gulp.task('build', () => {
    return gulp.src(['src/*.svelte']) 
       .pipe(gulpSvelte({
          format : 'iife',
          name : 'Widget'
       }))
       .pipe(rename(function (path) {
          path.basename = "widget_"+path.basename.toLowerCase();
       }))
       .pipe(babel({
          presets: ['env']
       }))
       .pipe(uglify())
       .pipe(gulp.dest('./dist/'))
       // send copy to dev
       //.pipe(gulp.dest('../../../assets/dist/elezioni/'))
       // send to production
       //.pipe(gulp.dest('../../../assets/js/async/politiche2018/'));
 });

 gulp.task('default', function () {
    gulp.watch(['src/*.svelte'], ['build']);
 });

