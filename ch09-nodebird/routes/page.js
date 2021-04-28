const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middleware');
const { Post, User, Hashtag } = require('../models');

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user; // 넌적스가 user 정보를 사용 할 수  있게 해줌
  res.locals.followerCount = req.user ? req.user.Followers.length : 0;
  res.locals.followingCount = req.user ? req.user.Followings.length : 0;
  res.locals.followerIdList = req.user
    ? req.user.Followings.map(f => f.id)
    : [];
  next();
});

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile', { title: '내 정보 nodebird' });
});

router.get('/join', isNotLoggedIn, (req, res) => {
  res.render('join', { title: '회원 가입' });
});

router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ['id', 'nick'],
      },
      order: [['createdAt', 'DESC']],
    });
    res.render('main', {
      title: 'NodeBird',
      twits: posts,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/hashtag', async (req, res, next) => {
  const query = req.query.hashtag;
  if (!query) {
    return res.redirect('/');
  }
  try {
    const hashtag = await Hashtag.findOne({ where: { title: query } });
    let posts = [];
    if (hashtag) {
      posts = await hashtags.getPosts({ include: [{ model: User }] });
    }

    return res.render('main', { title: `${query} | NodeBird`, twits: posts });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;
