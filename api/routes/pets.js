const express = require("express");
const Router = express.Router();
const mongoose = require("mongoose");
const petDb = require("../model/pet");

Router.get("/", (req, res, next) => {
  petDb.find().then(result=>{
    if(result){
      res.status(200).json(result);
    }
    else{
      res.status(404).json({message:"Not found the pets!!"})
    }

  }).catch(err=>{
    console.log(err);
    res.status(500).json({error:err})
  })
});

Router.post("/", (req, res, next) => {
  const pets = new petDb({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });
  pets
    .save()
    .then((result) => {
      console.log(result);
      res
        .status(201)
        .json({ message: "Successfully created Pet!", createdPet: result });
    })
    .catch((err) => console.log(err));
});

Router.get("/:petId", (req, res, next) => {
  const id = req.params.petId;
  petDb
    .findById(id)
    .then((result) => {
      console.log(result);
      if(result){
        res.status(200).json({ result });      
      }
      else{
        res.status(404).json({message:"Pet not found with this id!!"})
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

Router.delete("/:petId", (req, res, next) => {
  const id = req.params.petId;
  petDb.remove({_id:id}).then(result=>{
    console.log(result);
    res.status(200).json(result);
  }).catch(err=>{
    console.log(err);
    res.status(500).json({error:err});
  })
});

Router.patch('/:petId',(req,res,next)=>{
  const id=req.params.petId;
  petDb.update({_id:id},{$set:{name:req.body.newName, price:req.body.newPrice}})
  .then(result=>{
    console.log(result);
    res.status(201).json({message:"pet is updated!!", updatedPet:result});
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({error:err});
  })
})

module.exports = Router;
