const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middleware');

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user; // 넌적스가 user 정보를 사용 할 수  있게 해줌
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followerIdList = {};
  next();
});

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile', { title: '내 정보 nodebird' });
});

router.get('/join', isNotLoggedIn, (req, res) => {
  res.render('join', { title: '회원 가입' });
});

router.get('/', (req, res, next) => {
  console.log('router');
  const twits = [];
  res.render('main', {
    title: 'NodeBird',
    twits,
  });
});

module.exports = router;
