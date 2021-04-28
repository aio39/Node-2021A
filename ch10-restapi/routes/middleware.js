exports.isLoggedIn = (req, res, next) => {
  // passport가 isAuthenticated를 만들어줌.
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send('로그인 필요');
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent('로그인 한 상태입니다.');
    res.redirect(`/?error=${message}`);
  }
};
