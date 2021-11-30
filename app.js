var createError = require('http-errors');        // 에러 처리 모듈
var express = require('express');              // 서버 모듈
var path = require('path');                   // 경로 지정 모듈
const port = 3000;
// 서버에 의해 사용자의 컴퓨터에 저장되는 정보(장바구니)
var cookieParser = require('cookie-parser');    // 쿠키 모듈
var logger = require('morgan');               // 로그 모듈

var indexRouter = require('./routes/index');    // 라우터 모듈 
var usersRouter = require('./routes/users');    // users 모둘

var app = express();                         // 서버객체 

app.set('views', path.join(__dirname, 'views'));   // jade 경로
app.set('view engine', 'jade');
app.listen(port, function(){
  console.log(`Example app listening at http://localhost:${port}`);
});
// 미들 웨어
app.use(logger('dev'));                             // 로그 출력
app.use(express.json());                            // json 형태(res 및 req)사용
app.use(express.urlencoded({ extended: false }));     // post 방식 전송
app.use(cookieParser());                            // 쿠키 처리
app.use(express.static(path.join(__dirname, 'public')));  // 정적 파일 경로
app.use('/', indexRouter);                           // 라우터 경로
app.use('/users', usersRouter);

app.use(function(req, res, next) {   // 에러처리 미들웨어 
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;                // 본 파일을 모듈로 생성