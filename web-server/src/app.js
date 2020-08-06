const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory 
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Christian Ramirez'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Christian Ramirez'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        helpMessage: "I'm trying to be good",
        name: 'Christian Ramirez'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must to provide a address term'
        })
    }else{
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if(error){
                return res.send({error})
            }

            forecast(latitude, longitude, (error, data) =>{
                if(error){
                    return res.send({error})
                }

                res.send({
                    forecast: data,
                    location,
                    address: req.query.address
                })
            })
        })
    }
})

//Goal: wire up /weather
//1. Require geocode/forecast
//2. Use the address to geocode
//3. Use the coordinates to get forecast
//4. Send back the real forecast and location

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'You must to provide a search term'
        })
    }

    res.send({
        products: []
    })
})

// This route match with whatever that start with /help/...

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Ups.. We can not found this page',
        errorMessage: 'Help article not found',
        name: 'Christian Ramirez'
    })
})

// We can use * to 404 page but always have to be in the end
// * means that whatever match 

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Ups.. We can not found this page',
        errorMessage: 'This route does not match with anyone that we are created',
        name: 'Christian Ramirez'
    })
})

// Start the server
// 3000 is the port that we will use

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})