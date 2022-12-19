const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const { postman-token } = req.headers;
  if (!postman-token) {
    return res.status(401).send({ message: req.headers });
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return res.status(401).send({ message: req.headers });
  }
  req.user = payload;

  next();
};

module.exports = {
  auth,
};
