import gulp from "gulp";
import del from "del";
import CONFIG from "../config.babel";

gulp.task('clean', () => {
    return del(`${CONFIG.dist}/**`, {force: true});
});

gulp.task('watch', () => {
    const scss = `${CONFIG.src}/scss/**/*.scss`;
    const html = `${CONFIG.src}/html/**/*.html`;
    const typescript = `${CONFIG.src}/typescript/**/*.ts`;

    gulp.watch(scss, ['scss']);
    gulp.watch(html, ['html']);
    gulp.watch(typescript, ['typescript']);
});
