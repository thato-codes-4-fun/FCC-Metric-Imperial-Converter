'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function(app) {
  let convertHandler = new ConvertHandler();
  app.get('/api/convert', (req, res) => {
    let input = req.query.input
    let validUnits = ['km', 'mi', 'm', 'ft', 'gal', 'l', 'kg', 'lbs']
    if (validUnits.includes(input.toLowerCase())) {
      input = `1${input}`
    } 
    console.log(`input===>>>: ${input}`)


    let initUnit = convertHandler.getUnit(input);
    let initNum = convertHandler.getNum(input)
    if (!initNum && !initUnit ) {
      return res.send('invalid number and unit')
    }

    if (!initUnit || Number.isInteger(initUnit)) {
      return res.send('invalid unit')
    }
    if (initUnit == 'l' || initUnit == 'L') {
      initUnit = 'L'
    } else {
      initUnit = initUnit.toLowerCase()
    }

    console.log('init unit: ', initUnit)

    initNum = convertHandler.getNum(input)
    if (!initNum) {
      return res.send(
        'invalid number'
      )
    }


    let returnUnit = convertHandler.getReturnUnit(initUnit);
    if (!returnUnit) {
      res.send('invalid unit')
    }
    if (returnUnit == 'L' || returnUnit == 'l') {
      returnUnit = 'L'
    } else {
      returnUnit = returnUnit.toLowerCase()
    }

    let returnNum = parseFloat(convertHandler.convert(initNum, initUnit))

    console.log('init num: ', initNum)
    console.log('init unit: ', initUnit)
    console.log('return unit: ', returnUnit)
    console.log('return num: ', returnNum)


    res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string: convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
    })

  })


};
