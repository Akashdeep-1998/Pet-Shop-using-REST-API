const express = require("express");
const Router = express.Router();
const auth = require("../authentication/auth");
const orderController = require("../controllers/orders");

Router.get("/", auth, orderController.getAllOrders);

Router.post("/", auth, orderController.postPet);

Router.get("/:orderId", auth, orderController.getSingleOrder);

Router.delete("/:orderId", auth, orderController.deleteOrder);

module.exports = Router;
