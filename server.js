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

app.get('/',
  function (req, res) {
    res.send('Hello World')
  })

// app.get('/weather', 
// function (req, res) { 
//   const theNewData=weatherData.data.map(value=>{
//     let editedData=new Weather(value);
//     // console.log(editedData);
//     return editedData;
//   });
//   res.send(theNewData);
// })
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
class Weather {
  constructor(obj) {
    this.description = obj.weather.description
    this.data = obj.valid_date
  }
}
app.listen(PORT)