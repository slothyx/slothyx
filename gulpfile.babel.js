'use strict';
/* Config */
import CONFIG from "./gulp/config.babel";
/* Core */
import gulp from "gulp";
/* Utility */
import del from "del";
import sequence from "gulp-sequence";
/* Sass */
import scss from "gulp-sass";
import sourcemaps from "gulp-sourcemaps";
/* Images */
/* JS */

/* Transpile scss to css */
gulp.task('scss', () => {
    const src = `${CONFIG.src}/scss/main.scss`;
    const dist = `${CONFIG.dist}/scss/`;

    gulp.src(src)
        .pipe(sourcemaps.init())
        .pipe(scss({outputStyle: 'compressed'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dist))
});

gulp.task('clean', () => {
    return del(`${CONFIG.dist}/**`, {force: true});
});

gulp.task('watch', () => {
    const scss = `${CONFIG.src}/scss/**/*`;

    gulp.watch(scss, ['scss']);
});

gulp.task('default', sequence(['clean'], ['scss'], ['watch']));
