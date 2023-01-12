const request = require('request');

const forecast = (latitud, longitud, callback) => {
const url = 'http://api.weatherstack.com/current?access_key=20cfb7426f29bbdf60a8ca6a9e1d58cb&query='+ longitud + ',' + latitud

request({url, json:true}, (error, {body }) =>{
    if(error) {
        callback('Error: No hem pogut establir la connexió', undefined)
    } else if (body.error){
        callback('Error: invalid location. Try again!', undefined)
    }else{
        callback(undefined, {
            temperature: body.current.temperature,
            feelslike: body.current.feelslike,
            weather: body.current.weather_descriptions[0]
         })
    
    }
})
}

module.exports = forecast