var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var app = express();


// 设置默认端口号
const port = 8848;
const address = 'localhost';

// 引入数据库
require('./utils/db');
// serach
const searchInterface = require('./routes/search');
// add
const addInterface = require('./routes/add');
// login
const loginInerface = require('./routes/login');


// 分页查询
// 在制品报表
const wipReportInterface = require('./routes/wipReport/pagesSearch');
// 操作日志查询
const operateLogs = require('./routes/operateLogs/logSearch');
const operateUsers = require('./routes/operateLogs/singleSearch');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// VUE 界面
// app.use(express.static('./public/dist'));

// 查询
app.use('/apiInterface/v1', searchInterface);
app.use('/apiInterface/v1', wipReportInterface);
// 日志查询
app.use('/apiInterface/v1', operateLogs)
app.use('/apiInterface/v1',operateUsers);
// 新增
app.use('/apiInterface/v1', addInterface);

// 登录
app.use('/apiInterface/v1', loginInerface);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(port, address, (req, res) => {
  console.log(`Server is running at:http://${address}:${port}`);
})

module.exports = app;
