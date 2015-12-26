var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var gutil = require('gulp-util');
var watchify = require('watchify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var glob = require('glob');
var _ = require('lodash');

var sourceFiles = [],
  b,
  opts;

// Static Server + watching scss/html files
gulp.task('serve', [
  'browserify', 'sass',
], function() {
  gulp.watch('app/**/*.scss', ['sass']);
  gulp.watch('app/scripts/src/**/*.js', ['browserify']);
});

gulp.task('sass', function() {
  gulp.src('./app/stylesheets/bundle.scss').pipe(plugins.sass().on('error', plugins.sass.logError)).pipe(plugins.autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  })).pipe(gulp.dest('./app/stylesheets/'));
});

gulp.task('browserify', bundle); // so you can run `gulp js` to build the file

function bundle() {

  //Config de browserify if the src folder is empty, or if a file was added in the source folder
  var currentSourceFiles = glob.sync('app/scripts/src/**/*.js');

  if (_.isEmpty(currentSourceFiles) || !_.isEqual(sourceFiles.sort(), currentSourceFiles.sort())) {
    sourceFiles = currentSourceFiles;
    configBrowserify();
  }

  return b.bundle()
  // log errors if they happen
    .pipe(plugins.plumber()).pipe(source('bundle.js')).pipe(gulp.dest('./app/scripts/dist'));
}

function configBrowserify() {

  // add custom browserify options here
  var customOpts = {
    entries: sourceFiles,
    debug: true
  };

  opts = _.assign({}, watchify.args, customOpts);
  b = watchify(browserify(opts));

  // add transformations here
  // i.e. b.transform(coffeeify);
  b.transform('babelify', {
    presets: ['es2015', 'react',]
  });

  b.on('update', bundle); // on any dep update, runs the bundler
  b.on('log', gutil.log); // output build logs to terminal
}
