const gulp = require('gulp')
const tsc = require('gulp-typescript')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify-es').default
const rename = require('gulp-rename')
const concat = require('gulp-concat')

gulp.task('build ts', () => {
  // Load the config
  let project = tsc.createProject('src/tsconfig.json', { declaration: true })

  // Build the project
  let result = project.src()
    .pipe(sourcemaps.init())
    .pipe(project())

  // Output the files
  result.dts.pipe(gulp.dest('dist'))
  return result.js
    .pipe(sourcemaps.write('../dist'))
    .pipe(gulp.dest('dist'))
})

gulp.task('concat', ['build ts'], () => {
  return gulp.src([
    "node_modules/pixi.js/dist/pixi.js",
    "node_modules/poly-decomp/build/decomp.js",
    "node_modules/matter-js/build/matter.js",
    "node_modules/deepmerge/dist/umd.js",
    "dist/phoenix.js",
  ])
    // Save the file unminified file
    .pipe(concat('phoenix.js'))
    .pipe(gulp.dest('dist'))
    // Uglify the unminified file
    .pipe(uglify())
    // Save the minified file
    .pipe(concat('phoenix.min.js'))
    .pipe(gulp.dest('dist'))
})

gulp.task('build', ['concat'], () => {
  gulp.watch('src/**/*.ts', ['concat'])
})