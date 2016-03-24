"use strict";

var mongoose = require("mongoose");

var Client = mongoose.model("Client", {
  name: String,
  clientUrl: String,
  pets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pet"}]
});

module.exports = Client;
