const request = require('request');


const geocode = (address, callback) => {
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibWFyY3JiMyIsImEiOiJjanJqanZvMXowYzdnNDRsbGN4N3JyMGhuIn0.im2TOkqyqEpCXhN4LWoZuA&limit=1'


    request({url: url, json:true}, (error, {body }) =>{
        if (error) {
            callback('Error: No hem pogut establir la connexió', undefined)
        }else if (body.features.length == 0){
            callback('Error: invalid location. Try again!', undefined)
        } else {
            callback(undefined, {
               latitude: body.features[0].center[1],
               longitude: body.features[0].center[0],
               location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode