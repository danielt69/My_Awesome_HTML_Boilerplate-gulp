var gulp = require('gulp');
var debug = require('gulp-debug');
// var browserSync = require('browser-sync').create();
// var reload = browserSync.reload;
// var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
// var csslint = require('gulp-csslint');
// var autoPrefixer = require('gulp-autoprefixer');
//if node version is lower than v.0.1.2
// require('es6-promise').polyfill();
var cssComb = require('gulp-csscomb');
var cmq = require('gulp-merge-media-queries');
var cleanCss = require('gulp-clean-css');
// var jshint = require('gulp-jshint');
// var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
// var concat = require('gulp-concat');
// var minifyHtml = require('gulp-minify-html');
// var imageMin = require('gulp-imagemin');
var cache = require('gulp-cache');
// var pxtorem = require('gulp-pxtorem');
var less = require('gulp-less');



///////////////////     TASKS    //////////////////////


//////// themes:

gulp.task('sass',function(){
    gulp.src('palcon-mu/wp-content/themes/**/scss/skins/style-*.scss', { base: 'palcon-mu/wp-content/themes/'})

        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sourcemaps.init({loadMaps: false}))
        // .pipe(sass({
        //     includePaths: require('node-neat').includePaths
        // }))
        .pipe(sass())
        // .pipe(autoPrefixer())
        .pipe(cssComb())
        .pipe(cmq({log:true}))
        // .pipe(csslint())
        // .pipe(csslint.reporter())
        // .pipe(concat('main.css'))
        .pipe(debug())
        .pipe(gulp.dest('dist/css'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cleanCss())
        // .pipe(pxtorem({replace: false }))
        .pipe(sourcemaps.write())
        .pipe(debug())
        .pipe(gulp.dest('dist/css'))
        // .pipe(reload({stream:true}))
});
gulp.task('less',function(){
    gulp.src('palcon-mu/wp-content/themes/**/less/skins/style-*.less', { base: 'palcon-mu/wp-content/themes/**/less/../'})
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sourcemaps.init({loadMaps: false}))
        // .pipe(sass({
        //     includePaths: require('node-neat').includePaths
        // }))
        .pipe(less())
        // .pipe(autoPrefixer())
        .pipe(cssComb())
        .pipe(cmq({log:true}))
        // .pipe(csslint())
        // .pipe(csslint.reporter())
        // .pipe(concat('main.css'))
        .pipe(debug())
        .pipe(gulp.dest('.'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cleanCss())
        // .pipe(pxtorem({replace: false }))
        .pipe(sourcemaps.write())
        .pipe(debug())
        .pipe(gulp.dest('css/'))
        // .pipe(reload({stream:true}))
});


//////// widgets:

gulp.task('less_widgets',function(){
    gulp.src(['palcon-mu/wp-content/plugins/wcms_widgets/precompiled_css/less/*.less'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sourcemaps.init({loadMaps: false}))
        // .pipe(sass({
        //     includePaths: require('node-neat').includePaths
        // }))
        .pipe(less())
        // .pipe(autoPrefixer())
        .pipe(cssComb())
        .pipe(cmq({log:true}))
        // .pipe(csslint())
        // .pipe(csslint.reporter())
        // .pipe(concat('main.css'))
        .pipe(debug())
        .pipe(gulp.dest('.'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cleanCss())
        // .pipe(pxtorem({replace: false }))
        .pipe(sourcemaps.write())
        .pipe(debug())
        .pipe(gulp.dest('palcon-mu/wp-content/plugins/wcms_widgets/css/'))
        // .pipe(reload({stream:true}))
});


//////////// main task ////////////

gulp.task('default',function(){
    // browserSync.init({
        // server: "./dist/"
    // });
    gulp.start('sass', 'less', 'less_widgets');
    gulp.watch('palcon-mu/wp-content/plugins/wcms_widgets/precompiled_css/less/',['less_widgets']);
    
    gulp.watch('palcon-mu/wp-content/themes/**/less/',['less']);
    gulp.watch('palcon-mu/wp-content/themes/**/scss/',['sass']);
    // gulp.watch('src/js/**/*.*',['js']);
    // gulp.watch('src/*.html*',['html']);
    // gulp.watch('src/images/**/*.*',['image']);
});
