'use strict';

const KvData = require('../app/models/keyValData');

//Require the dev-dependencies
let chai = require('chai');
var expect = chai.expect;
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('KvData', () => {
    beforeEach((done) => { //Before each test, empty db
        KvData.remove({}, (err) => { 
           done();         
        });     
    });

    /*
    * Test the /GET route
    */
    describe('/GET object', () => {
        it('it should GET all objects', (done) => {
          chai.request(server)
              .get('/object')
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
                done();
              });
        });
    });
    /*
     * Test the /POST route
     */
     describe('/POST object', () => {
         it('it should POST an object ', (done) => {
                 let data = {
                   key1: 'Value 1'
                 }
                 chai.request(server)
                     .post('/object')
                     .send(data)
                     .end((err, res) => {
                         res.should.have.status(200);
                         res.body.should.be.a('string');
                       done();
                     });
               });
     });
    /*
    * Test the /GET/:id route
    */
    describe('/GET/:id object', () => {
         it('it should GET a value by the given id', (done) => {
           let data = new KvData({ 'key': "value 1"});
           data.save((err, book) => {
                 chai.request(server)
                 .get('/object')
                 .end((err, res) => {
                     res.should.have.status(200);
                   done();
                 });
           });

         });
     });
});