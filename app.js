let express = require('express')
let app = express()

appSetup(app)
function appSetup (app) {
  // view engine setup
  let path = require('path')
  app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'ejs')

  const faviconIsPresent = false
  if (faviconIsPresent) {
    let favicon = require('serve-favicon')
    app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
  }

  let logger = require('morgan')
  app.use(logger('dev'))

  let bodyParser = require('body-parser')
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  let cookieParser = require('cookie-parser')
  app.use(cookieParser())

  let lessMiddleware = require('less-middleware')
  app.use(lessMiddleware(path.join(__dirname, 'public')))

  app.use(express.static(path.join(__dirname, 'public')))
}

mountRoutes(app)
function mountRoutes (app) {
  let index = require('./routes/index')
  let users = require('./routes/users')
  app.use('/', index)
  app.use('/users', users)
}

// catch 404 and forward to error handler
app.use(catch404)
function catch404 (req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
}

// error handler
app.use(errorHandler)
function errorHandler (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
}

module.exports = app
