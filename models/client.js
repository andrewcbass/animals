"use strict";

var mongoose = require("mongoose");

var Client = mongoose.model("Client", {
  name: String,
  clientUrl: String
});

module.exports = Client;
