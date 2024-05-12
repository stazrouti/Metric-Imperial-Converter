const chai = require("chai");
const ConvertHandler = require("../controllers/convertHandler.js");

let assert = chai.assert;

let convertHandler = new ConvertHandler();

// Unit Tests
suite("Unit Tests", function () {
        // Test for whole number input
        test("Whole number input", function (done) {
            let input = "32L";
            assert.equal(convertHandler.getNum(input), 32);
            done();
        });

        // Test for decimal input
        test("Decimal Input", function (done) {
            let input = "32.2L";
            assert.equal(convertHandler.getNum(input), 32.2);
            done();
        });

        // Test for fractional input
        test("Fractional Input", function (done) {
            let input = "32/3L";
            assert.equal(convertHandler.getNum(input), 32 / 3);
            done();
        });

        // Test for fractional input with decimal
        test("Fractional Input w/ Decimal", function (done) {
            let input = "9/3.3L";
            assert.equal(convertHandler.getNum(input), 9 / 3.3);
            done();
        });

        // Test for invalid input (double fraction)
        test("Invalid Input (double fraction)", function (done) {
            let input = "32/3/3L";
            assert.equal(convertHandler.getNum(input), undefined);
            done();
        });

        // Test for no numerical input
        test("No Numerical Input", function (done) {
            let input = "L";
            assert.equal(convertHandler.getNum(input), 1);
            done();
        });

        // Test for each valid unit input
        test("For Each Valid Unit Inputs", function (done) {
            let input = [
                "gal",
                "l",
                "mi",
                "km",
                "lbs",
                "kg",
                "GAL",
                "L",
                "MI",
                "KM",
                "LBS",
                "KG",
            ];
            let output = [
                "gal",
                "L",
                "mi",
                "km",
                "lbs",
                "kg",
                "gal",
                "L",
                "mi",
                "km",
                "lbs",
                "kg",
            ];
            input.forEach(function (ele, index) {
                assert.equal(convertHandler.getUnit(ele), output[index]);
            });
            done();
        });

        // Test for unknown unit input
        test("Unknown Unit Input", function (done) {
            assert.equal(convertHandler.getUnit("34kilograms"), undefined);
            done();
        });
    });

    // Test for convertHandler.getReturnUnit(initUnit) function
    suite("Function convertHandler.getReturnUnit(initUnit)", function () {
        // Test for each valid unit input
        test("For Each Valid Unit Inputs", function (done) {
            let input = ["gal", "l", "mi", "km", "lbs", "kg"];
            let expect = ["L", "gal", "km", "mi", "kg", "lbs"];
            input.forEach(function (ele, i) {
                assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
            });
            done();
        });
    });

    // Test for convertHandler.spellOutUnit(unit) function
    suite("Function convertHandler.spellOutUnit(unit)", function () {
        // Test for each valid unit input
        test("For Each Valid Unit Inputs", function (done) {
            let input = ["gal", "l", "mi", "km", "lbs", "kg"];
            let expect = [
                "gallons",
                "liters",
                "miles",
                "kilometers",
                "pounds",
                "kilograms",
            ];
            input.forEach(function (ele, i) {
                assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
            });
            done();
        });
    });

    // Test for convertHandler.convert(num, unit) function
    suite("Function convertHandler.convert(num, unit)", function () {
        // Test for Gal to L conversion
        test("Gal to L", function (done) {
            let input = [5, "gal"];
            let expected = 18.9271;
            assert.approximately(
                convertHandler.convert(input[0], input[1]),
                expected,
                0.1
            ); // 0.1 tolerance
            done();
        });

        // Test for L to Gal conversion
        test("L to Gal", function (done) {
            let input = [5, "l"];
            let expected = 1.32086;
            assert.approximately(
                convertHandler.convert(input[0], input[1]),
                expected,
                0.1
            ); // 0.1 tolerance
            done();
        });

        // Test for Mi to Km conversion
        test("Mi to Km", function (done) {
            let input = [5, "mi"];
            let expected = 8.0467;
            assert.approximately(
                convertHandler.convert(input[0], input[1]),
                expected,
                0.1
            ); // 0.1 tolerance
            done();
        });

        // Test for Km to Mi conversion
        test("Km to Mi", function (done) {
            let input = [5, "km"];
            let expected = 3.10686;
            assert.approximately(
                convertHandler.convert(input[0], input[1]),
                expected,
                0.1
            ); // 0.1 tolerance
            done();
        });

        // Test for Lbs to Kg conversion
        test("Lbs to Kg", function (done) {
            let input = [5, "lbs"];
            let expected = 2.26796;
            assert.approximately(
                convertHandler.convert(input[0], input[1]),
                expected,
                0.1
            ); // 0.1 tolerance
            done();
        });

        // Test for Kg to Lbs conversion
        test("Kg to Lbs", function (done) {
            let input = [5, "kg"];
            let expected = 11.02312;
            assert.approximately(
                convertHandler.convert(input[0], input[1]),
                expected,
                0.1
            ); // 0.1 tolerance
            done();
        });
    });
