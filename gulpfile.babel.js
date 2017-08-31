'use strict';
/* Config */
import CONFIG from "./gulp/config.babel";
/* Core */
import gulp from "gulp";
/* Utility */
import del from "del";
import sequence from "gulp-sequence";
import requireDir from "require-dir";
requireDir('./gulp/tasks');

gulp.task('clean', () => {
    return del(`${CONFIG.dist}/**`, {force: true});
});

gulp.task('watch', () => {
    const scss = `${CONFIG.src}/scss/**/*.scss`;

    gulp.watch(scss, ['scss']);
});

gulp.task('default', sequence(['clean'], ['scss'], ['watch']));
