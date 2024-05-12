// Function to split the input into number and string parts
function numberStringSplitter(input) {
  let number = input.match(/[.\d\/]+/g) || ["1"]; // Extracts the number part from the input
  let string = input.match(/[a-zA-Z]+/g)[0]; // Extracts the string part from the input

  return [number[0], string]; // Returns an array containing the number and string parts
}

// Function to check if a possible fraction is valid
function checkDiv(possibleFraction) {
  let nums = possibleFraction.split("/"); // Splits the possible fraction by "/"
  if (nums.length > 2) {
    return false; // Returns false if there are more than 2 parts after splitting
  }
  return nums; // Returns the array of parts if it's a valid fraction
}

// Constructor function for ConvertHandler
function ConvertHandler() {
  // Method to get the number part from the input
  this.getNum = function (input) {
    let result = numberStringSplitter(input)[0]; // Gets the number part from the input
    let nums = checkDiv(result); // Checks if it's a valid fraction
    if (!nums) {
      return undefined; // Returns undefined if it's not a valid number
    }
    let num1 = nums[0]; // Gets the first part of the fraction
    let num2 = nums[1] || "1"; // Gets the second part of the fraction or defaults to "1"
    result = parseFloat(num1) / parseFloat(num2); // Calculates the result of the fraction
    if (isNaN(num1) || isNaN(num2)) {
      return undefined; // Returns undefined if the number parts are not valid numbers
    }
    return result; // Returns the calculated result
  };

  // Method to get the unit part from the input
  this.getUnit = function (input) {
    let result = numberStringSplitter(input)[1].toLowerCase(); // Gets the string part from the input and converts it to lowercase
    switch (result) {
      case "km":
        return "km"; // Returns "km" if the unit is kilometers
      case "gal":
        return "gal"; // Returns "gal" if the unit is gallons
      case "lbs":
        return "lbs"; // Returns "lbs" if the unit is pounds
      case "mi":
        return "mi"; // Returns "mi" if the unit is miles
      case "l":
        return "L"; // Returns "L" if the unit is liters
      case "kg":
        return "kg"; // Returns "kg" if the unit is kilograms
      default:
        return undefined; // Returns undefined if the unit is not recognized
    }
  };

  // Method to get the return unit based on the initial unit
  this.getReturnUnit = function (initUnit) {
    let unit = initUnit.toLowerCase(); // Converts the initial unit to lowercase

    switch (unit) {
      case "km":
        return "mi"; // Returns "mi" if the initial unit is kilometers
      case "gal":
        return "L"; // Returns "L" if the initial unit is gallons
      case "lbs":
        return "kg"; // Returns "kg" if the initial unit is pounds
      case "mi":
        return "km"; // Returns "km" if the initial unit is miles
      case "l":
        return "gal"; // Returns "gal" if the initial unit is liters
      case "kg":
        return "lbs"; // Returns "lbs" if the initial unit is kilograms
      default:
        return undefined; // Returns undefined if the initial unit is not recognized
    }
  };

  // Method to spell out the unit
  this.spellOutUnit = function (initUnit) {
    let unit = initUnit.toLowerCase(); // Converts the unit to lowercase

    switch (unit) {
      case "km":
        return "kilometers"; // Returns "kilometers" if the unit is kilometers
      case "gal":
        return "gallons"; // Returns "gallons" if the unit is gallons
      case "lbs":
        return "pounds"; // Returns "pounds" if the unit is pounds
      case "mi":
        return "miles"; // Returns "miles" if the unit is miles
      case "l":
        return "liters"; // Returns "liters" if the unit is liters
      case "kg":
        return "kilograms"; // Returns "kilograms" if the unit is kilograms
      default:
        return "don't know"; // Returns "don't know" if the unit is not recognized
    }
  };

  // Method to convert the initial number and unit to the return unit
  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541; // Conversion factor for gallons to liters
    const lbsToKg = 0.453592; // Conversion factor for pounds to kilograms
    const miToKm = 1.60934; // Conversion factor for miles to kilometers
    let unit = initUnit.toLowerCase(); // Converts the initial unit to lowercase
    let result;

    switch (unit) {
      case "km":
        result = initNum / miToKm; // Converts kilometers to miles
        break;
      case "gal":
        result = initNum * galToL; // Converts gallons to liters
        break;
      case "lbs":
        result = initNum * lbsToKg; // Converts pounds to kilograms
        break;
      case "mi":
        result = initNum * miToKm; // Converts miles to kilometers
        break;
      case "l":
        result = initNum / galToL; // Converts liters to gallons
        break;
      case "kg":
        result = initNum / lbsToKg; // Converts kilograms to pounds
        break;
      default:
        result = undefined; // Returns undefined if the unit is not recognized
    }
    return parseFloat(result.toFixed(5)); // Returns the result rounded to 5 decimal places
  };

  // Method to generate the output string
  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`; // Returns the formatted output string
  };
}

module.exports = ConvertHandler; // Exports the ConvertHandler constructor function
