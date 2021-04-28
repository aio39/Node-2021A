const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middleware');
const User = require('../models/user');

const router = express.Router();

router.post('/join', isNotLoggedIn, async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    // 같은 유저가 존재하는지 체크
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.redirect('/join?error=exist');
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res.redirect('/');
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
  // local 전략을 사용
  // 미들웨어 내부의 미들웨어
  passport.authenticate(
    'local',
    { session: false },
    (authError, user, info) => {
      if (authError) {
        console.error(authError);
        return next(authError);
      }
      if (!user) {
        return res.redirect(`/?loginError=${info.message}`);
      }
      // passport는 login과 logout 메소드를 넣어줌.
      // login 메소드는 user.serializeUser를 실행함.
      return req.login(user, loginError => {
        if (loginError) {
          console.error(loginError);
          return next(loginError);
        }
        return res.redirect('/');
      });
    },
  )(req, res, next); // 미들웨어 내의 미들웨어
});

router.get('/logout', isLoggedIn, (req, res) => {
  // req에서 user객체를 제거하고 session도 제거함.
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/kakao', passport.authenticate('kakao'));

// 카카오전략은 로그인에 성공하면  자동으로 req.login을 호출해줌.
router.get(
  '/kakao/callback',
  passport.authenticate('kakao', {
    failureRedirect: '/',
  }),
  (req, res) => {
    res.redirect('/');
  },
);

module.exports = router;
