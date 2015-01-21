var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var templateCache = require('gulp-angular-templatecache');
var uncss = require('gulp-uncss');
var glob = require('glob');

gulp.task('sass', function() {
    gulp.src('public/stylesheets/style.scss')
        .pipe(plumber())
        .pipe(sass())
        /*.pipe(uncss({
            html: [
                'public/index.html',
                'public/views/home.html',
                'public/views/login.html',
                'public/views/signup.html',
                'public/views/addWeek.html',
                'public/views/viewWeek.html',
                'public/views/valoraciones.html',
                'public/views/adminUsers.html'
            ]
        }))*/
        //.pipe(csso())
        .pipe(gulp.dest('public/stylesheets'));

    gulp.src([
        'public/stylesheets/*.css',
        'public/stylesheets/style.css'
        ])
        .pipe(concat('style.css'))
        /*.pipe(uncss({
            html: [
                'public/index.html',
                'public/views/home.html',
                'public/views/login.html',
                'public/views/signup.html',
                'public/views/addWeek.html',
                'public/views/viewWeek.html',
                'public/views/valoraciones.html',
                'public/views/adminUsers.html',
                'public/vendor/angular-bootstrap-calendar-tpls.js',
                'public/vendor/ui-bootstrap-custom-tpls-0.12.0.js',
                'public/vendor/select.js'
            ]
        }))*/
        .pipe(csso())
        .pipe(gulp.dest('public'));
});

gulp.task('watch', function() {
    gulp.watch('public/stylesheets/*.scss', ['sass']);
    gulp.watch('public/views/**/*.html', ['templates']);
    gulp.watch(['public/**/*.js', '!public/app.min.js', '!public/templates.js', '!public/vendor'], ['compress']);
});

gulp.task('compress', function() {
    gulp.src([
        'public/vendor/angular.js',
        'public/vendor/moment.js',
        'public/vendor/es.js',
        'public/vendor/*.js',
        'public/app.js',
        'public/services/*.js',
        'public/controllers/*.js',
        'public/filters/*.js',
        'public/directives/*.js'
    ])
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public'));
});

gulp.task('templates', function() {
    gulp.src('public/views/**/*.html')
        .pipe(templateCache({ root: 'views', module: 'MyApp' }))
        .pipe(gulp.dest('public'));
});

gulp.task('default', ['templates', 'sass', 'compress', 'watch']);