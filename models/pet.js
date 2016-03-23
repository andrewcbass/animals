"use strict";

var mongoose = require("mongoose");

var Pet = mongoose.model("Pet", {
  name: String,
  petUrl: String,
  clients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Client"}]
});

module.exports = Pet;
