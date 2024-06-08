const jwt = require('jsonwebtoken');

const checkCookieJWT = (req, res, next) => {
  if (!req.cookies.jwt) {
    return res.redirect('/')
  }
  req.headers.authorization = `Bearer ${req.cookies.jwt}`;
  next();
};

const checkAuth = (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization || !authorization.startWith("Bearer ")) {
    return res.status(401).send({ message: "Необходима авторизация" });
  }

  const token = authorization.replace("Bearer ", "");

  try {
    req.user = jwt.verify(token, "some-secret-key");
  } catch (err) {
    return res.status(401).send({ message: "Необходима авторизация" });
  }

  next();
};

module.exports = {
  checkAuth,
  checkCookieJWT
}