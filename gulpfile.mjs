import { src, dest, watch, parallel } from 'gulp'

import sass from 'sass'
import gulpSass from 'gulp-sass'
import concat from 'gulp-concat'
import uglify from 'gulp-uglify-es'
import browserSync from 'browser-sync'
import autoprefixer from 'gulp-autoprefixer'

const bs = browserSync.create()
const sassCompiler = gulpSass(sass)

export function scripts() {
  return src(['node_modules/swiper/swiper-bundle.js', 'app/js/main.js'])
    .pipe(concat('main.min.js'))
    .pipe(uglify.default())
    .pipe(dest('app/js'))
    .pipe(bs.stream())
}

export function styles() {
  return src('app/scss/style.scss')
    .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'] }))
    .pipe(concat('style.min.css'))
    .pipe(sassCompiler({ style: 'compressed' }))
    .pipe(dest('app/css'))
    .pipe(bs.stream())
}

export function watching() {
  watch(['app/scss/style.scss'], styles)
  watch(['app/js/main.js'], scripts)
  watch(['app/*.html']).on('change', bs.reload)
}

export function browsersync() {
  bs.init({
    server: {
      baseDir: 'app/',
    },
  })
}

export function build() {
  return src(['app/css/style.min.css', 'app/js/main.min.js', 'app/**/*.html'], {
    base: 'app',
  }).pipe(dest('dist'))
}

export default parallel(styles, scripts, browsersync, watching)
