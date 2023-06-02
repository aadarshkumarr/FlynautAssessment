//this middleware handles error if someone try to write different url so it will gives error for that..
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

module.exports = { notFound };
