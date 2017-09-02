import gulp from "gulp";
import CONFIG from "../config.babel";
import htmlmin from "gulp-htmlmin";

gulp.task("html", function () {
    const src = `${CONFIG.src}/html/**/*.html`;
    const dist = `${CONFIG.dist}/html/`;

    return gulp.src(src)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(dist));
});
