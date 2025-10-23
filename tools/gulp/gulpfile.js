import * as gulp from 'gulp';
import * as sass from 'sass';
import gulpSass from 'gulp-sass'; 
import * as sourcemaps from 'gulp-sourcemaps';
import {default as minifyCss} from 'gulp-clean-css';
import {default as optimizeImage, mozjpeg} from 'gulp-imagemin';
import {default as minifyJavascript} from 'gulp-uglify';

const compileSass = gulpSass(sass);
const SCSS_GLOB = 'scss/**/*.scss';
const IMG_GLOB = 'img/**/*';
const JS_GLOB = 'js/**/*.js';

gulp.task('sass', function () {
    return gulp.src([SCSS_GLOB])
               .pipe(compileSass())
               .pipe(gulp.dest('build/css'));
});

gulp.task('minify-css', function () {
    return gulp.src(['build/css/**/*.css'])
               .pipe(sourcemaps.init())
               .pipe(minifyCss())
               .pipe(sourcemaps.write())
               .pipe(gulp.dest('build/css-dist'));
});

gulp.task('images', function () {
    return gulp.src([IMG_GLOB], {encoding: false})
               .pipe(optimizeImage([mozjpeg()]))
               .pipe(gulp.dest('build/img'));
});

gulp.task('js', function () {
    return gulp.src([JS_GLOB])
               .pipe(sourcemaps.init())
               .pipe(minifyJavascript())
               .pipe(sourcemaps.write())
               .pipe(gulp.dest('build/js'));
});

gulp.task('watch', function () {
    const watcher = gulp.watch([SCSS_GLOB, IMG_GLOB, JS_GLOB]);
    watcher.on("change", (path) => {
                    console.log(`Changes on ${path}, rebuilding project`);
                    gulp.series('default');
                } 
              );
});


gulp.task('default', gulp.series('sass', 'minify-css', 'images', 'js'));
