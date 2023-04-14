const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
  suite('assertations', function() {

    test('should correctly read a whole number input.', function() {
      assert.equal(convertHandler.getNum('1km'), 1);
    })

    test('should correctly read a decimal number input.', function() {
      assert.equal(convertHandler.getNum('1.1km'), 1.10000)
    })

    test('should correctly read a fractional input', function() {
      assert.equal(convertHandler.getNum('1/2km'), 0.5)
    })

    test('should correctly read a fractional input with a decimal', function() {
      assert.equal(convertHandler.getNum('1.1/2km'), 0.55)
    })

    test('should correctly return an error on a double-fraction', function() {
      assert.equal(convertHandler.getNum('1/2/1km'), 0.5)
    })

    test('should correctly default to a numerical input of 1 when no numerical input is provided.', function() {
      assert.equal(convertHandler.getNum('km'), null)
    })

    test('should correctly read each valid input unit.', function() {
      assert.equal(convertHandler.getUnit('1.1km'), 'km')
      assert.equal(convertHandler.getUnit('1.1mi'), 'mi')
      assert.equal(convertHandler.getUnit('1.1l'), 'l')
      assert.equal(convertHandler.getUnit('1.1gal'), 'gal')
      assert.equal(convertHandler.getUnit('1.1lbs'), 'lbs')
      assert.equal(convertHandler.getUnit('1.1kg'), 'kg')
    })

    test('should correctly return an error for an invalid input unit', function() {
      assert.isNull(convertHandler.getUnit('1.1kms'))
    })

    test(' should return the correct return unit for each valid input unit.', function() {
      assert.equal(convertHandler.getReturnUnit('km'), 'mi')
      assert.equal(convertHandler.getReturnUnit('mi'), 'km')
      assert.equal(convertHandler.getReturnUnit('kg'), 'lbs')
      assert.equal(convertHandler.getReturnUnit('lbs'), 'kg')
      assert.equal(convertHandler.getReturnUnit('L'), 'gal')
      assert.equal(convertHandler.getReturnUnit('gal'), 'L')
    })

    test('should correctly return the spelled-out string unit for each valid input unit', function() {
      assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms')
      assert.equal(convertHandler.spellOutUnit('l'), 'liters')
      assert.equal(convertHandler.spellOutUnit('km'), 'kilometers')
      assert.equal(convertHandler.spellOutUnit('gal'), 'gallons')
      assert.equal(convertHandler.spellOutUnit('mi'), 'miles')
      assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds')
    })

    test('should correctly convert gal to L', function(){
      assert.equal(convertHandler.convert(1, 'gal'), '3.78541')
    })

    test('should correctly convert L to gal', function(){
      assert.equal(convertHandler.convert(1, 'l'), '0.26417')
    })

    test('should correctly convert mi to km', function(){
      assert.equal(convertHandler.convert(1, 'mi'), '1.60934')
    })

    test('should correctly convert km to mi', function(){
      assert.equal(convertHandler.convert(1, 'km'), '0.62137')
    })

    test('should correctly convert lbs to kg', function(){
      assert.equal(convertHandler.convert(1, 'lbs'), '0.45359')
    })

    test(' should correctly convert kg to lbs', function(){
      assert.equal(convertHandler.convert(1, 'kg'), '2.20462')
    })
  })


});