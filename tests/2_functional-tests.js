const chai = require('chai');
const assert = chai.assert;


const server = require('../server');


const chaiHttp = require('chai-http');
chai.use(chaiHttp);

suite('Functional Tests', function() {
  this.timeout(5000);
  suite('integration tests with chai-http', function() {

    test('Test GET /hello with no name', function(done) {
      chai
        .request(server)
        .get('/api/convert/?input=5kg')
        .end(function(err, res) {
          assert.equal(res.status, 200);
          //assert.equal(res.text, '');
          done();
        });
    });

    test('Convert a valid input such as 10L', function(done) {
      chai
        .request(server)
        .get('/api/convert/?input=10kg')
        .end(function(err, res) {
          //asserts here
          assert.equal(res.status, 200)
          // assert.equal(res.text, '{"initNum":10,"initUnit":"kg","returnNum":22.04624,"returnUnit":"lbs","string":"10 kilograms converts to 22.04624 pounds"}')
          done();
        })
    })

    test('Convert an invalid input such as 32g', function(done) {
      chai
        .request(server)
        .get('/api/convert/?input=10miles')
        .end(function(err, res) {
          assert.equal(res.text, 'invalid unit')
          done()
        })
    })

    test('Convert an invalid number such as 3/7.2/4kg', function(done) {
      chai
        .request(server)
        .get('/api/convert/?input=1//1kg')
        .end(function(err, res) {
          assert.equal(res.text, 'invalid number')
          done()
        })
    })

    test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram', function(done) {
      chai
        .request(server)
        .get('/api/convert?input=1//1kilograms')
        .end(function(err, res) {
          assert.equal(res.text, 'invalid number and unit')
          done()
        })
    })

    test('Convert with no number such as kg', function(done) {
      chai
        .request(server)
        .get('/api/convert?input=kg')
        .end(function(err, res) {
          assert.equal(res.text, '{"initNum":1,"initUnit":"kg","returnNum":2.20462,"returnUnit":"lbs","string":"1 kilograms converts to 2.20462 pounds"}')
          done()
        })
    })
  })
});

after(function() {
  chai.request(server)
    .get('/')
});


