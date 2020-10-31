const orderDb = require("../model/order");
const mongoose = require("mongoose");
exports.getAllOrders = (req, res, next) => {
  orderDb
    .find()
    .populate("pet", "_id name price")
    .then((result) => {
      res.status(200).json({
        total_order: result.length,
        orders: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.postPet = (req, res, next) => {
  const order = new orderDb({
    _id: mongoose.Types.ObjectId(),
    quantity: req.body.quantity,
    pet: req.body.petId,
  });
  order
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.getSingleOrder = (req, res, next) => {
  const id = req.params.orderId;
  orderDb
    .findById(id)
    .select("pet quantity")
    .populate("pet")
    .then((result) => {
      if (result) {
        console.log(result);
        res.status(200).json({
          message: "Order found !!",
          order: result,
        });
      } else {
        res.status(404).json({ message: "Order not found !!" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.deleteOrder = (req, res, next) => {
  orderDb
    .remove({ _id: req.params.orderId })
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
