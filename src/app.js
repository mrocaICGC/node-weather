const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require('request');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { response } = require('express')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars, engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather',
        nom: 'Marc Roca'
    })
})


app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'Welcome to the weather page.',
        desc: "Here you're about to see realtime weather data for every place you want!",
        nom: 'Marc Roca'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'How can I help you?',
        nom: 'Marc Roca'
        
    })
})



app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    /* else if (req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    } */

    //const address = req.query.address;

    geocode(req.query.address, (error, { latitude, longitude, location} = {}) =>{
        if(error) {
            //console.log('geocode error')
            return res.send( {error} )
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if(error){
               // console.log('forecast error')
                return res.send(error)
            }
       
           res.send({
            location, 
            forecastData    
            
         })
          })
       
    })

    
})


app.get('/products', (req, res) =>{ 
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) =>{
    res.render('error', {
        title: 'Error 404: Help article not found!',
        nom: 'Marc Roca'
        
    })

})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error 404: Page not found!',
        nom: 'Marc Roca'
        
    })
    
})


app.listen(3000, ()=> {
    console.log('Server is up on port 3000')
})