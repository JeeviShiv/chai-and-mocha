let chai = require('chai');
let chaiHttp  = require('chai-http');
chai.use(chaiHttp);
let expect = chai.expect;
let should = chai.should();
let Movie = require('../movieSchema');

const movieData = {
    id: '65d8855c36a35a7cf68f8070',
}
describe('movies', () => {
    beforeEach((done) => {
        Movie.remove({}, (err) => { 
           done();           
        });        
    });
});

describe("Testing addMovie",()=>{
    it("Should add the new movie",(done)=>{
            chai
            .request('http://localhost:3700')
            .get('/addmovie?name=boobaa&rating=5&genre=history&inStock=2')
            .end((err,res)=>{
                expect(res.statusCode).to.equal(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name').eql('boobaa');
                res.body.should.have.property('rating').eql(5);
            done();
            });
        });
    });

describe("Testing getMovie/:id Data (Have to assign one movie id in the file manually)",()=>{
    it("it should GET a book by the given id",(done)=>{
        chai
         .request('http://localhost:3700')
         .get('/getMovie/'+movieData.id)
         .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name');
            res.body.should.have.property('rating');
            res.body.should.have.property('genre');
            res.body.should.have.property('inStock');
            res.body.should.have.property('_id');
         done();
         });
    });
});

describe("Testing getMovie/:id Data name not eqal to given",()=>{
    it("it should GET a book by the given id",(done)=>{
        chai
         .request('http://localhost:3700')
         .get('/getMovie/'+movieData.id)
         .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name');
            expect(res.body).to.not.have.any.keys('title', 'status');
         done();
         });
    });
});

describe("Testing Update",()=>{
    it("Should update the movie data for given id",(done)=>{
        chai
        .request('http://localhost:3700')
        .get('/updateMovie/'+movieData.id+'?rating=6')
        .end((err,res)=>{
           expect(res.statusCode).to.equal(200);
           res.body.should.have.property('_id').eql(movieData.id);
        done();
        })
    });
});
describe("Testing Delete",()=>{
    it("Should delete the movie of given id",(done)=>{
        chai
        .request('http://localhost:3700')
        .get('/deleteMovie/'+movieData.id)
        .end((err,res)=>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Movie Deleted.');
         done();
         });
    })
});