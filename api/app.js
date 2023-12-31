var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var mongoose = require('mongoose')
var mongo_url = "mongodb://localhost:27017/projectBlogDb";
mongoose.connect(mongo_url).then(()=>{
  console.log("Db is Connected !")
})

var fileupload = require('express-fileupload')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var weatherApi = require('./routes/weatherAPi')
var blogRouter = require('./routes/blogRouter')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(fileupload())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(
  {
    origin:'http://localhost:5173',
    credentials: true,
    methods:["GET","POST","PUT"]
  }
))
console.log(__dirname)
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/weather',weatherApi)
app.use('/blog',blogRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
