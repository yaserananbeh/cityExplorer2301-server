const express = require('express')
const app = express()
 
const cors = require('cors');

app.use(cors())
const weatherData=require('./data/weather.json');
require('dotenv').config();
const PORT=process.env.PORT
app.get('/', 
 function (req, res) { 
  res.send('Hello World') 
})
app.get('/weather', 
function (req, res) { 

 res.send(weatherData) 
//  console.log(next)
})
app.listen(PORT) 