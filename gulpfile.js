const gulp = require('gulp')
const devServer = require('gulp-develop-server')
const path = require('path')

gulp.task('serve', (done) => {
  devServer.listen({
    path: path.resolve(__dirname, './webim/index.js')
  })

  done()
})

gulp.task('restart', (done) => {
  devServer.restart()
  done()
})

gulp.task('watch', () => {
  gulp.watch([path.resolve(__dirname, './webim/**/*')], gulp.series('restart'))
})

gulp.task('default', gulp.series('serve', 'watch'))