const axios = require('axios')
require('dotenv').config();
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
const Movie=require('../models/movie.model');
const movieController =(req,res)=>{
    let region =req.query.region;
    if(region){
      region=region.slice(0,2);
      const movieUrl=`https://api.themoviedb.org/3/discover/movie?api_key=${MOVIE_API_KEY}&region=${region}`
      axios.get(movieUrl).then((response)=>{
        const shapedData=response.data.results.map((obj)=>new Movie(obj))
        res.json(shapedData);
      }).catch((error)=>{
        res.send(error.message)
      });
    }
    else{
      res.send('please provide region as search query')
    }
  
  }
  module.exports=movieController;