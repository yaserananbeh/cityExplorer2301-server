const express = require('express')
const app = express()
const axios = require('axios')

const cors = require('cors');
app.use(cors())
const weatherData = require('./data/weather.json');
require('dotenv').config();
const PORT = process.env.PORT
const weatherBitKey = process.env.WEATHER_API_KEY;
console.log(weatherBitKey)
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
console.log(MOVIE_API_KEY)

app.get('/',
  function (req, res) {
    res.send('Hello World')
  })

app.get('/weather', (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;
  console.log(lat, lon);
  if (lat && lon) {
    const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${weatherBitKey}&lat=${lat}&lon=${lon}`;

    axios.get(weatherBitUrl).then(response => {
        const responseData = response.data.data.map(obj => new Weather(obj));
        res.json(responseData)
    }).catch(error => {
        res.send(error.message)
    });
} else {
    res.send('please provide the proper lat and lon')
}
})
app.get('/movie',(req,res)=>{
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

})
class Movie{
  constructor(obj){
    this.title=obj.title;
    this.overview=obj.overview;
    this.average_votes=obj.vote_average;
    this.total_votes=obj.vote_count;
    this.image_url=`https://image.tmdb.org/t/p/w500/${obj.backdrop_path}`;
    this.popularity=obj.popularity;
    this.released_on=obj.release_date;
  }
}
class Weather {
  constructor(obj) {
    this.description = obj.weather.description
    this.data = obj.valid_date
  }
}
app.listen(PORT)