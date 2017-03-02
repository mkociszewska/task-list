'use strict';

var gulp    = require('gulp-help')(require('gulp'));

var clean = require('gulp-clean');
var webserver = require('gulp-webserver');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var runSequence = require('run-sequence');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');


var srcHtml = './src/**/*.html';
var srcSass = './src/assets/sass/*.scss';
var srcJS = 'src/app/**/*.js';
var indexHtml ='./app/layout/index.html';


gulp.task(
    'serve',
    'start server and watch for changes',
    serve
);

gulp.task(
    'clean-dist',
    'delete all files from dist',
    cleanDist
);

gulp.task(
    'copy-html',
    'copy all htmls to dist',
    copyHtml
);

gulp.task(
    'start-webserver',
    'run a local webserver with livereload enabled',
    startWebserver
);

gulp.task(
    'watch-html',
    'watch if html changes and copy it to dist',
    watchHtml
);

gulp.task(
    'build-css',
    'compile sass files, save compiled styles in dist',
    buildCss
);

gulp.task(
    'watch-sass',
    'watch sass before compilation',
    watchSass
);

gulp.task(
    'copy-dependencies',
    'copy external dependencies',
    copyDependencies
);

gulp.task(
    'es2016to2015',
    'use new es6 syntax, saves compiled files in dist',
    es2016to2015
);

gulp.task(
    'watch-js',
    'watch compiled js and copy it to dist',
    watchJS
);

function serve() {
    runSequence(
        'clean-dist',
        ['copy-html', 'build-css', 'es2016to2015', 'copy-dependencies'],
        ['start-webserver', 'watch-html', 'watch-sass', 'watch-js']
    );
}

function cleanDist() {
    return gulp.src('./build/*', {read: false})
        .pipe(clean({force: true}));
}

function copyHtml() {
    gulp.src(srcHtml)
        .pipe(gulp.dest('./build/'));
}

function startWebserver() {
    gulp.src('./build/')
        .pipe(webserver({
            livereload: true,
            open: true,
            port: 8000,
            fallback: indexHtml
        }));
}

function watchHtml() {
    return watch(srcHtml, { ignoreInitial: false })
        .pipe(gulp.dest('./build/'));
}

function buildCss() {
    return gulp.src(srcSass)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/assets'));
}

function watchSass() {
    return watch(srcSass, buildCss, { ignoreInitial: false });
}

function copyDependencies() {
    gulp.src('./bower_components/**/*')
        .pipe(gulp.dest('build/vendor/'))
}

function es2016to2015() {
    return gulp.src(srcJS)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/app/'));
}

function watchJS() {
    return watch(srcJS, es2016to2015, { ignoreInitial: false })
}
