const { expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

const server = require("../index.js"); //export indexserver
const car = require("../db");

describe("Test Car", () => {
  let testCar;

  beforeEach((done) => {
    car.deleteMany((err) => {
      if (!err) {
        car.create(
          {
            carMake: "Ford",
            model: "Fiesta",
            carYear: "2019",
          },
          (err, created) => {
            if (!err) {
              testCar = created;
              return done();
            }
          }
        );
      }
    });
  });

  it("should list all cars", (done) => {
    chai
      .request(server)
      .get("/car/getAll")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        return done();
      });
  });

  it("Should create a car", (done) => {
    //successfull1!!!!!!!!!!!! had to change url params to /car/create from /create
    chai
      .request(server)
      .post("/car/create")
      .send({
        carMake: "Vauxhall",
        model: "Corsa",
        carYear: "2020",
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res).to.haveOwnProperty("text", "Created Successfully");
        return done();
      });
  });

 

  it("Should find a car by ID", (done) => {
    chai
      .request(server)
      .get("/car/get/" + testCar.id)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.haveOwnProperty("carMake", "Ford");
        expect(res.body).to.haveOwnProperty("model", "Fiesta");
        expect(res.body).to.haveOwnProperty("carYear", 2019);
        return done();
      });
  });

  it("Should update a car by ID", (done) => {
    chai
      .request(server)
      .put("/car/replace/" + testCar.id)
      .send({
        carMake: "Vauxhall",
        model: "Corsa",
        carYear: "2017",
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(202);
        expect(res.body).to.haveOwnProperty("carMake", "Vauxhall");
        expect(res.body).to.haveOwnProperty("model", "Corsa");
        expect(res.body).to.haveOwnProperty("carYear", 2017);
        return done();
      });
  });

  it("should delete a car by ID", (done) => {
      chai.request(server)
      .delete("/car/delete/" + testCar.id)
      .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(204);
          return done();
      })
  })
});
