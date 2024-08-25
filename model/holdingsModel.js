const { model } = require("mongoose");
const  holdingsSchema  = require("../schema/holdingsSchema.js");
const Holding = new model("Holding", holdingsSchema);
module.exports = Holding;
