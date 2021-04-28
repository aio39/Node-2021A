const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');

const User = require('../models/user');

module.exports = () => {
  // session 에  저장할 데이터를 정함.
  // 첫 로그인떄에만 사용
  passport.serializeUser((user, done) => {
    done(null, user.id); // 첫번쨰 인수는 에러 발생 시 사용
  });

  // 매 요청마다 실행됨.
  passport.deserializeUser((id, done) => {
    User.findOne({
      where: { id },
      include: [
        { model: User, attributes: ['id', 'nick'], as: 'Followers' },
        { model: User, attributes: ['id', 'nick'], as: 'Followings' },
      ],
    })
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  local();
  kakao();
};
