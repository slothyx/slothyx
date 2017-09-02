import gulp from "gulp";
import imagemin from "gulp-imagemin";
import CONFIG from "../config.babel";

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
