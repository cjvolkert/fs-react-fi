/* eslint-disable no-undef */
require("dotenv").config();
const MONGO_URL = process.env.MONGODB_URI;
const PORT = process.env.PORT;

module.exports = {
  MONGO_URL,
  PORT,
};
