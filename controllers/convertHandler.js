
function ConvertHandler() {

  this.getNum = function(input) {
    const match = input.match(/^([\d./]+)\s*/i);
    let value;
    try{
    value = match[1];
    }catch(e){
      return null;
    }
    let numericValue;
    if (!value) {
      return null;
    }
     if (value.includes('/')) {
      // If the value contains a fraction, convert it to a decimal
      const [numeratorStr, denominatorStr] = value.split('/');
      const numerator = parseFloat(numeratorStr);
      const denominator = parseFloat(denominatorStr);
      numericValue = numerator / denominator;
    } 

   else if (value.includes('.')) {
      // If the value contains a decimal point, convert it to a number with up to 5 decimal places
      numericValue = parseFloat(value).toFixed(5);
    }else {
      // If the value is an integer, parse it as a number
      numericValue = parseInt(value);
    }
    return numericValue;
  };

  this.getUnit = function(input) {
    const match = input.match(/^([\d./]+)\s*(km|mi|m|ft|gal|l|kg|lbs)$/i);
    let unit;
    try{
      unit = match[2];
    } catch(e){
      return null;
    }
    return unit;
  };

  this.getReturnUnit = function(initUnit) {
    let result;
    switch (initUnit.toLowerCase()) {
      case 'km':
        result = 'mi';
        break;
      case 'mi':
        result = 'km';
        break;
      case 'gal':
        result = 'L';
        break;
      case 'l':
        result = 'gal';
        break;
      case 'kg':
        result = 'lbs';
        break;
      case 'lbs':
        result = 'kg';
        break;
      default:
        result = null;
        break
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    switch (unit.toLowerCase()) {
      case 'l':
        result = 'liters'
        break;
      case 'km':
        result = 'kilometers';
        break;
      case 'gal':
        result = 'gallons';
        break;
      case 'mi':
        result = 'miles';
        break;
      case 'lbs':
        result = 'pounds';
        break;
      case 'kg':
        result = 'kilograms';
        break;
      default:
        result = null;
        break;
    }
    return result;
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit.toLowerCase()) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      default:
        result = null;
        break
    }
    return result ? result.toFixed(5) : null;
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let spelledOutUnit = this.spellOutUnit(initUnit)
    let spelledOutReturnUnit = this.spellOutUnit(returnUnit)
    let result = `${initNum} ${spelledOutUnit} converts to ${returnNum} ${spelledOutReturnUnit}`;
    return result;
  };

}

module.exports = ConvertHandler;
