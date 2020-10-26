const express = require("express");
const Router = express.Router();
const mongoose=require('mongoose');
const orderDb=require('../model/order');

Router.get("/", (req, res, next) => {
  orderDb.find().select('pet _id quantity').populate('pet').then(result=>{
    res.status(200).json({
      total_order:result.length,
      orders:result
    });
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({error:err});
  })
});

Router.post("/", (req, res, next) => {
  const order=new orderDb({
    _id: mongoose.Types.ObjectId(),
    quantity:req.body.quantity,
    pet:req.body.petId
  })
  order.save().then(result=>{
    console.log(result);
    res.status(200).json(result);
  })
  .catch(err=>{
    res.status(500).json({error:err})
  })
});

Router.get("/:orderId", (req, res, next)=>{
  const id=req.params.orderId;
  orderDb.findById(id).select('pet quantity').populate('pet').then(result=>{
    if(result){
      console.log(result);
      res.status(200).json({
        message:"Order found !!",
        order: result
      })
    }
    else{
      res.status(404).json({message:"Order not found !!"});
    }
  })
  .catch(err=>{
    res.status(500).json({error:err})
  })
})

Router.delete("/:orderId", (req, res, next) => {
  orderDb.remove({_id:req.params.orderId}).then(result=>{
    console.log(result);
    res.status(200).json(result);
  }).catch(err=>{
    console.log(err);
    res.status(500).json({error:err});
  })
});

module.exports = Router;
