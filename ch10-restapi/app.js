const express = require('express');
const cookieParser = require('cookie-parser');

const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');

dotenv.config();
const indexRouter = require('./routes');
const authRouter = require('./routes/auth');
const { sequelize } = require('./models/index');
const passportConfig = require('./passport'); // index.js 는 생략 가능
const passport = require('passport');

const app = express();
passportConfig();

app.set('port', process.env.PORT || 8001);
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});

console.log(sequelize);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('db OK ✔️');
  })
  .catch(err => {
    console.error(err);
  });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  }),
);
app.use(passport.initialize()); // req에 passport 설정을  넣음.
app.use(passport.session()); // res.session에 passport 설정을 저장.
app.use('/auth', authRouter);
app.use('/', indexRouter);

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
