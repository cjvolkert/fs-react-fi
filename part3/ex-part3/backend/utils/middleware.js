const logger = require("./logger");

const errorHandler = (error, req, res, next) => {
  console.error(error);
  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }
  next(error);
};

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

module.exports = {
  errorHandler,
  unknownEndpoint,
  requestLogger,
};
