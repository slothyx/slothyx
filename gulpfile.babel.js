import gulp from "gulp";
import sequence from "gulp-sequence";
import getTasks from "require-dir";

getTasks('./gulp/tasks');

gulp.task('default', sequence(['clean'], ['scss', 'assets', 'typescript'], ['watch']));
