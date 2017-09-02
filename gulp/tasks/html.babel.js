import gulp from "gulp";
import CONFIG from "../config.babel";

gulp.task("html", function () {
    const src = `${CONFIG.src}/html/**/*.html`;
    const dist = `${CONFIG.dist}/html/`;

    return gulp.src(src)
        .pipe(gulp.dest(dist));
});
