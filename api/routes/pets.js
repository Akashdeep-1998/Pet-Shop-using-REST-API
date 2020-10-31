const express = require("express");
const Router = express.Router();
const multer = require("multer");
const auth = require("../authentication/auth");
const petsController = require("../controllers/pets");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false); //callback for not accepting the file if file format is not jpeg or png.
  }
};
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
}); //5mb file(measured in bytes)

Router.get("/", petsController.getAllPets);

Router.post("/", auth, upload.single("petImage"), petsController.addPet);

Router.get("/:petId", petsController.getSinglePet);

Router.delete("/:petId", auth, petsController.deletePet);

Router.patch("/:petId", auth, petsController.patchPet);

module.exports = Router;
