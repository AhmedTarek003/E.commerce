const globalError = (err, req, res, next) => {
  err.statuscode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statuscode).json({
    status: err.status,
    msg: err.message,
    stack: err.stack,
  });
};
module.exports = globalError;
