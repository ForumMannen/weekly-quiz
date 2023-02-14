function validate(schema) {
  return function (req, res, next) {
    const { error } = schema.validate(req.body);
    if (!error) return next();
    res.status(400).json(error.message);
  };
}

function auth(req, res, next) {
  if (req.session.email) return next();
  res.status(401).json("Not authorized");
}

module.exports = { validate };
