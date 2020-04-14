"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const admin = require("firebase-admin");
require("dotenv").config();
const clientData = require("./db");
const { Users, Spots } = require("../services/");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.options("*", cors());

// endpoint access
Users(app, admin, clientData);
Spots(app, admin, clientData);

// server is running
app.listen(PORT, () => {
  console.log(`\x1b[36m%s\x1b[0m`, `Server is up on ${PORT}`);
  console.log(`\x1b[36m%s\x1b[0m`, `---------------------------------------`);
});
module.exports = app;
