const router = require("express").Router();
const Car = require("../db");

const data = [];

router.post("/create", (req, res, next) => { //working
  const car = req.body;
  new Car(car)
    .save()
    .then(() => {
      res.status(201).send("Created Successfully");
    })
    .catch((err) => next({ status: 400, message: err.message }));
});

router.get("/getAll", (req, res, next) => { //readAll Working
  Car.find((err, car) => {
    if (err) return next({ status: 400, message: err.message });
    else return res.json(car);
  });
});

router.get("/get/:id", (req, res, next) => { //get by id WORKING
  const id = req.params.id;
  Car.findById(id, (err, result) => {
    if (err) return next({ status: 400, message: err.message });
    else return res.json(result);
  })});



router.put("/replace/:id", (req, res) => { 
  const newCar = req.query;
  const id = req.params.id;

  Car.findByIdAndUpdate(id, newCar, (err, replaced) => {
      if (err)
      return next({status: 400, message: err.message });
      else
      Car.findById(id, (err, updatedCar) => {
          if (err)
          return next({status: 400, message: err.message});
          else
          return res.status(202).send(updatedCar);
      })
  })
});

router.delete("/delete/:id", (req, res) => {//??
  const id = req.params._id;
  
  Car.findByIdAndDelete(id, (err) => {
    if (err) return next({ status: 400, message: err.message });
    else return res.statusCode(200);
  })
});

module.exports = router;