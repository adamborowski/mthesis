"use strict";
import gulp from 'gulp';
import babel from 'gulp-babel';
import less from 'gulp-less';
import shell from 'gulp-shell';


gulp.task('-compile-js', () => {
    return gulp.src('src/scripts/main.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('target'));
});

gulp.task('-compile-less', () => {
    return gulp.src('src/stylesheets/main.less')
        .pipe(less({}))
        .pipe(gulp.dest('target'));
});


gulp.task('-prince',
    shell.task('prince src/content/main.html -o target/Thesis.pdf --javascript --script=target/main.js -s target/main.css', {})
);

gulp.task('default', ['-compile-js', '-compile-less', '-prince'], ()=> {

});


gulp.task('watch', ['default'], ()=> {
    gulp.watch('src/scripts/**/*.js', ['-compile-js']);
    gulp.watch('src/stylesheets/**/*.less', ['-compile-less']);
    gulp.watch('src/content/**/*.html', ['-prince']);
    gulp.watch(['target/main.js', 'target/main.css'], ['-prince']);
});
