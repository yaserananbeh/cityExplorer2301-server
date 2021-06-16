const express = require('express')
const app = express()
const cors = require('cors');
app.use(cors())

require('dotenv').config();
const PORT = process.env.PORT
// const weatherData = require('./data/weather.json');

const weatherController=require('./controller/weather.controller');
const movieController=require('./controller/movie.controller');
const indexController=require('./controller/index.controller');

app.get('/',indexController)

app.get('/weather',weatherController)
app.get('/movie',movieController)


app.listen(PORT)