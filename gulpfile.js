const gulp = require('gulp')
const tsc = require('gulp-typescript')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify-es').default
const rename = require('gulp-rename')
const concat = require('gulp-concat')

const files = [
  'dist/phoenix.js',
  'node_modules/pixi.js/dist/pixi.min.js',
  'node_modules/poly-decomp/build/decomp.min.js',
  'node_modules/matter-js/build/matter.min.js',
  'node_modules/deepmerge/dist/umd.js',
]

gulp.task('build-ts', () => {
  // Load the config
  let project = tsc.createProject('src/tsconfig.json', { declaration: true })

  // Build the project
  let result = project.src()
    .pipe(sourcemaps.init())
    .pipe(project())

  // Output the files
  result.dts.pipe(gulp.dest('dist'))
  return result.js
    .pipe(sourcemaps.write('../phoenix.js.map'))
    .pipe(gulp.dest('dist'))
})

gulp.task('concat', ['build-ts'], () => {
  return gulp.src(files)
    .pipe(concat('phoenix.js'))
    .pipe(gulp.dest('dist'))
})

gulp.task('dev', ['concat'], () => {
  gulp.watch('src/**/*.ts', ['concat'])
})

gulp.task('prod', ['concat'], () => {
  return gulp.src('dist/phoenix.js')
    .pipe(uglify())
    .pipe(rename('phoenix.min.js'))
    .pipe(gulp.dest('dist'))
})