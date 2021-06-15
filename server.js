const express = require('express')
const app = express()
 
const cors = require('cors');

app.use(cors())
const weatherData=require('./data/weather.json');
require('dotenv').config();
const PORT=process.env.PORT
const weatherBitData=process.env.WEATHR_BIT_KEY;
console.log(weatherBitData)

app.get('/', 
 function (req, res) { 
  res.send('Hello World') 
})

app.get('/weather', 
function (req, res) { 
  const theNewData=weatherData.data.map(value=>{
    let editedData=new Weather(value);
    console.log(editedData);
    return editedData;
  });
  res.send(theNewData);
  
 
})
class Weather{
  constructor(obj){
    this.description=obj.weather.description
    this.data=obj.valid_date
  }
}
app.listen(PORT) 