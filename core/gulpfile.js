const 
    gulp = require('gulp'),
    pump = require('pump'),
    babel = require('gulp-babel');

const task_babel = function () {
    return pump([
            gulp.src('src/**/*js'),
            babel(),
            gulp.dest('dist')
        ]);
}

gulp.task('babel', task_babel);