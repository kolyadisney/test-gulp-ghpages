var gulp = require("gulp"),
    sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    browserSync = require("browser-sync").create(),
    nunjucksRender = require('gulp-nunjucks-render'),
    ghPages = require('gh-pages'),
    path = require('path');

var paths = {
    styles: {
        src: "./src/sass/*.sass",
        dest: "build/css"
    },
    
    html: {
        src: './src/pages/*.html',
        dest: './build'
    },

    js: {
        src: './src/js/*.js',
        dest: './build/js'
    },
    otherFiles: {
        src: './src/other_files/**/*',
        dest: './build'
    }
};

function style() {
    return gulp
        .src(paths.styles.src)
        .pipe(sass())
        .on("error", sass.logError)
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());
}

function js() {
    return gulp
        .src(paths.js.src)
        .pipe(gulp.dest(paths.js.dest))
        .pipe(browserSync.stream());
}



function html() {
    return gulp
        .src(paths.html.src)
        .pipe(nunjucksRender({
            path: './src/pages'
        }))
        .pipe(gulp.dest(paths.html.dest))
        .pipe(browserSync.stream());
}

function otherFiles() {
    return gulp
        .src(paths.otherFiles.src)
        .pipe(gulp.dest(paths.otherFiles.dest))
        .pipe(browserSync.stream());
}

function reload() {
    browserSync.reload();
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
    gulp.watch(paths.styles.src, style);
    gulp.watch(paths.html.src, html);
    gulp.watch(paths.js.src, js);
    gulp.watch(paths.html.src).on('change', reload);
}

function deploy(cb) {
    ghPages.publish(path.join(process.cwd(), './build'), cb);
}

//export functions
exports.watch = watch
exports.style = style;
exports.html = html;
exports.deploy = deploy;
exports.otherFiles = otherFiles;
exports.js = js;


var build = gulp.parallel(style, watch, html, js, otherFiles);
var deploy = gulp.parallel(deploy);

//gulp tasks
gulp.task('default', build);
gulp.task('deploy', deploy);