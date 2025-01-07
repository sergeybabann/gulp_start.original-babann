import { src, dest, watch, parallel } from 'gulp'

import sass from 'sass'
import gulpSass from 'gulp-sass'
import concat from 'gulp-concat'
import uglify from 'gulp-uglify-es'
import browserSync from 'browser-sync'
import autoprefixer from 'gulp-autoprefixer'

const bs = browserSync.create()
const sassCompiler = gulpSass(sass)

// function scripts() {
//   return src(['node_modules/swiper/swiper-bundle.js', 'app/js/main.js'])
//     .pipe(concat('main.min.js'))
//     .pipe(uglify())
//     .pipe(dest('app/js'))
//     .pipe(browserSync.stream())
// }

export function scripts() {
  return src(['node_modules/swiper/swiper-bundle.js', 'app/js/main.js'])
    .pipe(concat('main.min.js'))
    .pipe(uglify.default())
    .pipe(dest('app/js'))
    .pipe(bs.stream())
}

// function styles() {
//   return src('app/scss/style.scss')
//     .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'] }))
//     .pipe(concat('style.min.css'))
//     .pipe(sass({ style: 'compressed' }))
//     .pipe(dest('app/css'))
//     .pipe(browserSync.stream())
// }

export function styles() {
  return src('app/scss/style.scss')
    .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'] }))
    .pipe(concat('style.min.css'))
    .pipe(sassCompiler({ style: 'compressed' }))
    .pipe(dest('app/css'))
    .pipe(bs.stream())
}

// function watching() {
//   watch(['app/scss/style.scss'], styles)
//   watch(['app/js/main.js'], scripts)
//   watch(['app/*.html']).on('change', browserSync.reload)
// }

export function watching() {
  watch(['app/scss/style.scss'], styles)
  watch(['app/js/main.js'], scripts)
  watch(['app/*.html']).on('change', bs.reload)
}

// function browsersync() {
//   browserSync.init({
//     server: {
//       baseDir: 'app/',
//     },
//   })
// }

export function browsersync() {
  bs.init({
    server: {
      baseDir: 'app/',
    },
  })
}

// exports.styles = styles
// exports.scripts = scripts
// exports.watching = watching
// exports.browsersync = browsersync

// exports.default = parallel(styles, scripts, browsersync, watching)
export default parallel(styles, scripts, browsersync, watching)
