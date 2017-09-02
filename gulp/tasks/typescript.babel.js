import gulp from "gulp";
import CONFIG from "../config.babel";
import browserify from "browserify";
import source from "vinyl-source-stream";
import tsify from "tsify";
import sourcemaps from "gulp-sourcemaps";
import buffer from "vinyl-buffer";
import babelify from "babelify";

gulp.task('typescript', function () {
    const src = `${CONFIG.src}/typescript/main.ts`;
    const dist = `${CONFIG.dist}/typescript/`;

    return browserify({
        debug: true, // allow sourcemaps
        entries: [src],
    })
        .plugin(tsify)
        .transform('babelify', {
            presets: ['es2015'],
            extensions: ['.ts']
        })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(dist));
});
