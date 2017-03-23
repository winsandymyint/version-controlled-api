"use strict";

const KvData = require('../app/models/keyValData');

//Require the dev-dependencies
let chai = require('chai');
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
        it('it should GET all object', (done) => {
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
        /* it('it should not POST an object without key field', (done) => {
           let data = {
               key1: "Testing"
           }
           chai.request(server)
               .post('/object')
               .send(data)
               .end((err, res) => {
                   res.should.have.status(200);
                   res.body.should.have.property('errors');
                   res.body.should.to.have.any.keys('bar', 'baz');
                 done();
               });
         });*/
         it('it should POST an object ', (done) => {
                 let data = {
                   key1: "Testing"
                 }
                 chai.request(server)
                     .post('/object')
                     .send(data)
                     .end((err, res) => {
                         res.should.have.status(200);
                         res.body.should.to.be.a('object');
                       done();
                     });
               });

     });
     /*
       * Test the /GET/:id route
       */
       describe('/GET/:id object', () => {
           it('it should GET a object by the given key', (done) => {
             let data = new Object({ key: "Hello"});
             data.save((err, object) => {
                 chai.request(server)
                 .get('/object/' + data.key)
                 .send(data)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('string');
                     res.body.should.have.property('key').eql(object.key);
                   done();
                 });
             });

           });
       });
});