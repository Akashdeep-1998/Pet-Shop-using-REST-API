const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  pet: { type: mongoose.Schema.Types.ObjectId, ref: "Pet" },
  quantity: Number,
});
module.exports = mongoose.model("Order", orderSchema);
