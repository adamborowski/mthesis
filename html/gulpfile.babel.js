"use strict";
import gulp from "gulp";
import less from "gulp-less";
import shell from "gulp-shell";
import babelify from "babelify";
import browserify from "browserify";
import source from "vinyl-source-stream";
import buffer from "vinyl-buffer";


gulp.task('-compile-js', () => {

    var bundler = browserify('./src/scripts/main.js').transform(babelify, {
        presets: ['es2015']
    });

    return bundler.bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(gulp.dest('target'))
});

gulp.task('-compile-less', () => {
    return gulp.src('src/stylesheets/main.less')
        .pipe(less({
            relativeUrls: false
        }))
        .pipe(gulp.dest('target'));
});


gulp.task('-prince',
    shell.task(`prince src/content/main.html 
    -o target/Thesis.pdf 
    --javascript 
    --script=node_modules/jquery/jquery.js  
    --script=target/main.js  
    -s target/main.css 
    --fileroot=src/resources/
    `.split('\n').join('')
        , {})
);

gulp.task('default', ['-compile-js', '-compile-less', '-prince'], ()=> {

});


gulp.task('watch', ['default'], ()=> {
    gulp.watch('src/scripts/**/*.js', ['-compile-js']);
    gulp.watch('src/stylesheets/**/*.less', ['-compile-less']);
    gulp.watch('src/content/**', ['-prince']);
    gulp.watch(['target/main.js', 'target/main.css'], ['-prince']);
});