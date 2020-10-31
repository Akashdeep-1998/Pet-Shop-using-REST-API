const petDb = require("../model/pet");
const mongoose = require("mongoose");

exports.getAllPets = (req, res, next) => {
  petDb
    .find()
    .select("_id name price petImage")
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "Not found the pets!!" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.addPet = (req, res, next) => {
  const pets = new petDb({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    petImage: req.file.path,
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
};

exports.getSinglePet = (req, res, next) => {
  const id = req.params.petId;
  petDb
    .findById(id)
    .then((result) => {
      console.log(result);
      if (result) {
        res.status(200).json({ result });
      } else {
        res.status(404).json({ message: "Pet not found with this id!!" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.deletePet = (req, res, next) => {
  const id = req.params.petId;
  petDb
    .remove({ _id: id })
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.patchPet = (req, res, next) => {
  const id = req.params.petId;
  petDb
    .update(
      { _id: id },
      { $set: { name: req.body.newName, price: req.body.newPrice } }
    )
    .then((result) => {
      console.log(result);
      res.status(201).json({ message: "pet is updated!!", updatedPet: result });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
