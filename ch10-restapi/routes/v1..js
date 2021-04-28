const express = require('express');
const jwt = require('jsonwebtoken');

const { verifyToken } = require('./middleware');
const { Domain, User } = require('../models');

const router = express.Router();

router.post('/token', async (req, res) => {
  const { clientSecret } = req.body;
  try {
    const domain = await Domain.findOne({
      where: { clientSecret },
      include: { model: User, attributes: ['id', 'nick'] },
    });
    if (!domain) {
      return res
        .status(401)
        .json({ code: 401, message: '등록되지 않은 도메인 입니다.' });
    }
    const token = jwt.sign(
      {
        id: domain.User.id,
        nick: domain.User.nick,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1m', issuer: 'nodebird' },
    );

    return res.json({ code: 200, message: '토큰이 발급 되었습니다.', token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ code: 500, message: '서버에러' });
  }
});

router.get('/test', verifyToken, (req, res) => {
  res.json(req.decoded);
});
