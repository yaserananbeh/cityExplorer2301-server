const axios = require('axios')
require('dotenv').config();
const weatherBitKey = process.env.WEATHER_API_KEY;
const Weather = require('../models/weather.model');
const Cache = require('../helper/cashe');
const cacheObj = new Cache()

const weatherController = (req, res) => {
    const lat = req.query.lat;
    const lon = req.query.lon;
    if (lat && lon) {
        const weatherCacheKey = `weather-${lat}-${lon}`;
        // console.log(`weather-${lat}-${lon}`);
        if (cacheObj[weatherCacheKey]) {
            console.log('from cache');
            res.json(cacheObj[weatherCacheKey])
        }
        else {
            const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${weatherBitKey}&lat=${lat}&lon=${lon}`;

            axios.get(weatherBitUrl).then(response => {
                const responseData = response.data.data.map(obj => new Weather(obj));
                console.log('from the API');
                res.json(responseData);
                cacheObj[weatherCacheKey] = responseData;
            }).catch(error => {
                res.send(error.message)
            });
        }
    } else {
        res.send('please provide the proper lat and lon')
    }
}

module.exports = weatherController;