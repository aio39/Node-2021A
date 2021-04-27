const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');
module.exports = () => {
  // use에 첫번쨰로 전략을 선택한다.
  passport.use(
    // req.body의 key 값을 적습니다.
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      // new에서 넣은 매겨변수가 순서대로 들어감.
      async (email, password, done) => {
        try {
          const exUser = await User.findOne({ where: { email } });
          if (exUser) {
            // 보내져원 password와 해시된 db의 password를 비교
            const result = await bcrypt.compare(password, exUser.password);
            if (result) {
              // 성공하면 2번쨰 인수를 사용한다.
              // passport.authenticate로 가짐.
              done(null, exUser);
            } else {
              done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
            }
          } else {
            done(null, false, { message: '가입되지 않은 회원입니다.' });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      },
    ),
  );
};
