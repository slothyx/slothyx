import gulp from "gulp";
import imagemin from "gulp-imagemin";
import CONFIG from "../config.babel";
import sequence from "gulp-sequence";

gulp.task('images', () => {
    const src = `${CONFIG.src}/assets/images/**/*.+(jpg|png|gif)`;
    const dest = `${CONFIG.dist}/assets/images`;

    return gulp.src(src)
        .pipe(imagemin(
            [
                imagemin.gifsicle({interlaced: true}),
                imagemin.jpegtran({progressive: true}),
                imagemin.optipng({optimizationLevel: 5}),
                imagemin.svgo({plugins: [{removeViewBox: true}]})
            ]))
        .pipe(gulp.dest(dest))
});

gulp.task('icons', () => {
    const src = `${CONFIG.src}/assets/icons/**/*.+(ico|png)`;
    const dest = `${CONFIG.dist}/assets/icons`;

    return gulp.src(src)
        .pipe(gulp.dest(dest));
});

gulp.task('assets', sequence(['images', 'icons']));
