const { model } = require("mongoose");
const positionSchema = require("../schema/positionSchema");

const Position = new model("Position", positionSchema);
module.exports = Position;
 