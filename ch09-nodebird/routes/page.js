const express = require('express');

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = null;
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followerIdList = {};
  next();
});

router.get('/profile', (req, res) => {
  res.render('profile', { title: '내 정보 nodebird' });
});

router.get('/join', (req, res) => {
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
