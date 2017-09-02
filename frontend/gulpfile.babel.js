import gulp from "gulp";
import sequence from "gulp-sequence";
import getTasks from "require-dir";

getTasks('./gulp/tasks');

gulp.task('dev', sequence(['clean'], ['html'], ['scss', 'assets', 'typescript'], ['watch']));
gulp.task('prod', sequence(['clean'], ['html'], ['scss', 'assets', 'typescript']));
