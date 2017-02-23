    var browserSync     = require('browser-sync'),
        del             = require('del'),
        gulp            = require('gulp'),
        less            = require('gulp-less'),
        uglify          = require('gulp-uglify'),
        jshint          = require('gulp-jshint'),
        usemin          = require('gulp-usemin'),
        karma           = require('karma').Server;


    var settings = {

        servePath:      './src',

        serveRoutes: {
            
        },

        jsMatch:        ['./src/**/*.js', '!src/**/*_spec.js', '!src/bower_components/**/*.js'],
        htmlMatch:      ['./src/**/*.html','./src/**/*.htm'],
        imgMatch:       ['./src/images/**/*.png', './src/images/**/*.gif', './src/images/**/*.jpg', './src/images/**/*.jpeg'],

        lessMatch:      ['./src/styles/**/*.less'],
        lessCache:      './src/styles/.cache',

        useminFiles:    ['./src/default.html'],

        distDocs:       './docs',
        dist:           './dist'
    };


    /**
     * Clean up the distribution directory
     */
    gulp.task('clean', function () {

        return del([settings.dist+'/**/*']);
    });


    /**
     * Copy markdown, HTML, partials and CSS over to dist
     */
    gulp.task('copy', function () {

        gulp.src(settings.htmlMatch, { base: settings.servePath })
            .pipe(gulp.dest(settings.dist));

        gulp.src(settings.imgMatch, { base: settings.servePath })
            .pipe(gulp.dest(settings.dist));
    });


    /**
     * Compile Less into CSS
     */
    gulp.task('less', function () {

        return gulp.src(settings.lessMatch)
            .pipe(less())
            .pipe(gulp.dest(settings.lessCache))
            .pipe(browserSync.reload({ stream: true }));
    });


    /**
     * Concat and distribute files
     */
    gulp.task('build', ['js-hint', 'copy', 'clean', 'less'], function() {

        return gulp.src(settings.useminFiles)
            .pipe(usemin({
                css: [],
                cssCopy: [],
                js: [ uglify ],
                jsCopy: []
            }))
            .pipe(gulp.dest(settings.dist));
    });


    /**
     * JSHint JS files
     */
    gulp.task('js-hint', function () {

        return gulp.src(settings.jsMatch)
            .pipe(jshint())
            .pipe(jshint.reporter('default'))
            .pipe(browserSync.reload({ stream: true }));
    });


    /**
     * Run unit test
     */
    gulp.task('unit-test', function (done) {

        new karma({

            configFile: __dirname + '/karma.conf.js',
            singleRun: true

        }, done).start();
    });


    /**
     * Serve files
     */
    gulp.task('serve', ['less', 'js-hint'], function () {

        browserSync({
            server: {
                baseDir:    settings.servePath,
                routes:     settings.serveRoutes,
                directory:  true
            }
        });

        gulp.watch(settings.lessMatch, ['less']);

        gulp.watch(settings.jsMatch, ['js-hint', 'unit-test']);

        gulp.watch([settings.servePath+'/**/*']).on('change', browserSync.reload);
    });


    /**
     * Serve files from dist.
     */
    gulp.task('serve-dist', ['less', 'js-hint'], function () {

        browserSync({
            server: {
                baseDir:    settings.dist,
                routes:     settings.serveRoutes,
                directory:  true
            }
        });

        gulp.watch([settings.dist+'/**/*']).on('change', browserSync.reload);
    });