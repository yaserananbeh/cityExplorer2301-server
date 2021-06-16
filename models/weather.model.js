class Weather {
    constructor(obj) {
      this.description = obj.weather.description
      this.data = obj.valid_date
    }
  }
  module.exports=Weather;