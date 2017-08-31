import scss from "gulp-sass";
import sourcemaps from "gulp-sourcemaps";
import CONFIG from "../config.babel";
import gulp from "gulp";

gulp.task('scss', () => {
    const src = `${CONFIG.src}/scss/main.scss`;
    const dist = `${CONFIG.dist}/scss/`;

    gulp.src(src)
        .pipe(sourcemaps.init())
        .pipe(scss({outputStyle: 'compressed'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dist))
});
