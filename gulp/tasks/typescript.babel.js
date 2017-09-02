import typescript from "gulp-typescript-babel";
import gulp from "gulp";
import CONFIG from "../config.babel";

gulp.task('typescript', function () {
    const src = `${CONFIG.src}/typescript/**/*.ts`;
    const dist = `${CONFIG.dist}/typescript/`;

    gulp.src(src)
        .pipe(typescript({incremental: true, configFile: 'tsconfig.json'},
            {presets: ['es2015']}))
        .pipe(gulp.dest(dist))
});
