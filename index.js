const express = require('express'); //imported express after installing it
const app = express(); // app is calling express as a function!
const server = app.listen(4494) ;

const parser = require("body-parser"); //for parsing 

const carRoutes = require('./routes/carRoutes');


app.use(parser.json()); //parses data to json

const err = new Error("what");



app.use((req, res, next) => {
    console.log(req.method, req.url, new Date())
    return next(); // next -> app.post(...)
});

app.use("/car", carRoutes);

app.use("*", (req, res, next) => {
    return next({status: 404, message: "Invalid URL"});
});


app.use((err, req, res, next) => {
     res.status(err.status).send(err.message);
})

