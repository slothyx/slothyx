import gulp from "gulp";
import del from "del";
import CONFIG from "../config.babel";

gulp.task('clean', () => {
    return del(`${CONFIG.dist}/**`, {force: true});
});

gulp.task('watch', () => {
    const scss = `${CONFIG.src}/scss/**/*.scss`;
    gulp.watch(scss, ['scss']);
});
