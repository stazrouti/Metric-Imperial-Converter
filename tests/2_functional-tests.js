const chaiHttp = require("chai-http");
const chai = require("chai");
const server = require("../server");

let assert = chai.assert;

chai.use(chaiHttp);

        // Nested test suite for GET /api/convert endpoint
        suite("GET /api/convert => conversion object", function () {
            // Test case: Convert 10L (valid input)
            test("Convert 10L (valid input)", function (done) {
                chai
                    .request(server)
                    .get("/api/convert")
                    .query({ input: "10L" })
                    .end(function (err, res) {
                        assert.equal(res.status, 200);
                        assert.equal(res.body.initNum, 10);
                        assert.equal(res.body.initUnit, "L");
                        assert.approximately(res.body.returnNum, 2.64172, 0.1);
                        assert.equal(res.body.returnUnit, "gal");
                        done();
                    });
            });

            // Test case: Convert 32g (invalid input unit)
            test("Convert 32g (invalid input unit)", function (done) {
                chai
                    .request(server)
                    .get("/api/convert")
                    .query({ input: "32g" })
                    .end(function (err, res) {
                        assert.equal(res.status, 200);
                        assert.equal(res.body.initUnit, undefined);
                        done();
                    });
            });

            // Test case: Convert 3/7.2/4kg (invalid number)
            test("Convert 3/7.2/4kg (invalid number)", function (done) {
                chai
                    .request(server)
                    .get("/api/convert")
                    .query({ input: "3/7.2/4kg" })
                    .end(function (err, res) {
                        assert.equal(res.status, 200);
                        assert.equal(res.body.initNum, undefined);
                        done();
                    });
            });

            // Test case: Convert 3/7.2/4kilomegagram (invalid number and unit)
            test("Convert 3/7.2/4kilomegagram (invalid number and unit)", function (done) {
                chai
                    .request(server)
                    .get("/api/convert")
                    .query({ input: "3/7.2/4kilomegagram" })
                    .end(function (err, res) {
                        assert.equal(res.status, 200);
                        assert.equal(res.body.initNum, undefined);
                        assert.equal(res.body.initUnit, undefined);
                        done();
                    });
            });

            // Test case: Convert kg (no number)
            test("Convert kg (no number)", function (done) {
                chai
                    .request(server)
                    .get("/api/convert")
                    .query({ input: "kg" })
                    .end(function (err, res) {
                        assert.equal(res.status, 200);
                        assert.equal(res.body.initNum, 1);
                        assert.equal(res.body.initUnit, "kg");
                        assert.approximately(res.body.returnNum, 2.20462, 0.1);
                        assert.equal(res.body.returnUnit, "lbs");
                        done();
                    });
            });
        });