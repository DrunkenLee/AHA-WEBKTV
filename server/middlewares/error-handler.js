async function ErrorHandler(error, req, res, next) {
  console.log(
    "---------------------------------------------------",
    error,
    "---------------------------------------------------"
  );
}

module.exports = ErrorHandler;
