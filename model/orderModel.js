const{model} = require('mongoose');
const orderSchema = require('../schema/orderSchema');
const Order = new model("Order",orderSchema);
module.exports = Order