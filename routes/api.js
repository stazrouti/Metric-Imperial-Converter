const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

// Import necessary modules

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  // Define the route for "/api/convert" endpoint
  app.route("/api/convert").get(function (req, res) {
  let input = req.query.input;
  let initNum = convertHandler.getNum(input); // Get the numerical value from the input
  let initUnit = convertHandler.getUnit(input); // Get the unit from the input

  // Check for invalid input
  if (!initNum && !initUnit) {
    res.send("invalid number and unit");
    return;
  } else if (!initNum) {
    res.send("invalid number");
    return;
  } else if (!initUnit) {
    res.send("invalid unit");
    return;
  }

  let returnNum = convertHandler.convert(initNum, initUnit); // Convert the initial value to the target unit
  let returnUnit = convertHandler.getReturnUnit(initUnit); // Get the target unit
  let toString = convertHandler.getString(
    initNum,
    initUnit,
    returnNum,
    returnUnit
  ); // Generate the conversion string

  // Send the response as JSON
  res.json({ initNum, initUnit, returnNum, returnUnit, string: toString });
  });
  
};
