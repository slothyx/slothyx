import gulp from "gulp";
import server from "gulp-server-livereload";
import CONFIG from "../config.babel";

gulp.task('server', function() {
    const src = CONFIG.dist;
    console.log(src);

    gulp.src(src)
        .pipe(server({
            defaultFile: 'index.html',
            livereload: true,
            open: true
        }));
});
