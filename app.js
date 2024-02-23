import express from 'express';
import movies from './movieSchema';

const db = require('./db');

const app = express();
const port = 3700;

app.get('/',(req,res)=>{
    res.send("Welcome to the page");
});

app.get('/getMovie/:id',async(req,res)=> {
    const movieData = await movies.findById(req.params.id);
    if(!movieData){
        res.status(200).json({ message: 'Could not find movie for this id.' });
    }
    else{
        res.send(movieData);
    }
});

app.get('/addMovie',(req,res)=> {
    movies.create(req.query).then((results)=>{
        res.send(results);
    })
});

app.get('/updateMovie/:id',async (req,res)=> {
    await movies.findByIdAndUpdate(req.params.id, {rating:req.query.rating},{new:true}).then((results)=>{
        res.send(results);
    })
});
app.get('/deleteMovie/:id',async (req,res)=> {
    const movie = await movies.findOneAndDelete({ _id: req.params.id });
    if(!movie) {
        res.status(200).json({ message: 'Could not find movie for this id.' });
    }
    else{ 
        res.status(200).json({ message: 'Movie Deleted.' });
    }
});

app.listen(port,(err, data)=>{
    if(err) throw err;
    console.log("server listening on port :", port);
});

export default app;
