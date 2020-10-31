const express = require("express");
const app = express();
const BodyParser = require("body-parser");
const petRoutes = require("./api/routes/pets");
const orderRoutes = require("./api/routes/orders");
const mongoose = require("mongoose");
const userRoutes=require('./api/routes/user');
const PORT = process.env.PORT || 2000;

app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());
app.use("/pets", petRoutes);
app.use("/orders", orderRoutes);
app.use("/user",userRoutes);
app.use((req, res, next) => {
  const error = new Error("Not found!");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ message: error.message });
});
mongoose
  .connect(
    "Enter Your mongoDB srv string.. "
  )
  .then(() => {
      console.log('Database is connected successfully');
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
  })
  .catch(err=>console.log(err));
