const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
require('dotenv').config()

const initiateChargeRouter = require('./routes/initiateCharge')
const mobileMoneyRouter = require('./routes/mobileMoney')
const validateRouter = require('./routes/validate')

const app = express()
const port = 5000

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Access-Control-Allow-Origin, Origin, X-Requested-With, X-AUTHENTICATION, X-IP, Content-Type, Accept, Authorization')
  res.setHeader('Access-Control-Allow-Credentials', 'false')
  res.setHeader('Cache-Control', 'no-cache')
  next()
})

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/initiate-charge', initiateChargeRouter)
app.use('/mobile-money', mobileMoneyRouter)
app.use('/validate', validateRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

app.listen(port, () => console.log(`Listening on port ${port}`))

module.exports = app
