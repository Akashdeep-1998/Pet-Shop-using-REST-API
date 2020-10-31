const userDb = require("../model/user");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

exports.userSignup = (req, res, next) => {
  userDb
    .find({ email: req.body.email })
    .then((result) => {
      if (result.length >= 1) {
        return res.status(422).json({ message: "Email id already exists!!" });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
          if (err) {
            return res.status(500).json({ error: err });
          } else {
            const user = new userDb({
              _id: mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hashedPassword,
            });
            user
              .save()
              .then((result) => {
                console.log(result);
                res
                  .status(201)
                  .json({ message: "User created!!", userData: result });
              })
              .catch((err) => {
                res.status(500).json({ error: err });
              });
          }
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
};

exports.userLogin = (req, res, next) => {
  userDb
    .find({ email: req.body.email })
    .then((result) => {
      if (result.length < 1) {
        return res.status(401).json({ message: "AUthentication failed!!" });
      }
      bcrypt.compare(req.body.password, result[0].password, (err, response) => {
        if (err) {
          return res.status(401).json({ message: "Authentication failed!!" });
        }
        if (response) {
          const jwtToken = jwt.sign(
            {
              email: result[0].email,
              userId: result[0]._id,
            },
            ENTER_YOUR_SECRET_KEY,
            { expiresIn: "1h" }
          );
          return res
            .status(200)
            .json({ message: "authentication success!!", token: jwtToken });
        }
        res.status(401).json({
          message: "Authentication failed!!",
        });
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.userDelete = (req, res, next) => {
  userDb
    .remove({ _id: req.params.userId })
    .then(() => {
      res.status(200).json({ message: "User deleted!!" });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
