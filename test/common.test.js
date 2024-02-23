let chai = require('chai');
let chaiHttp  = require('chai-http');
let expect = chai.expect;
chai.use(chaiHttp);

describe("Testing my API",()=>{
    it("Should have a status www of 200",(done)=>{
        chai
         .request('http://localhost:3700')
         .get('/')
         .end((err,res)=>{
            expect(res.statusCode).to.equal(200);
            done();
         })
    });

    it("Should have a status of 404",(done)=>{
      chai
      .request('http://localhost:3700')
      .get('/moviesList')
      .end((err,res)=>{
         expect(res.statusCode).to.equal(404);
         done();
      })
    })
})