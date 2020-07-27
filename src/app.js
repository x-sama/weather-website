const path = require('path')
const express = require('express');
const hbs = require('hbs');
const app = express();
const chalk = require('chalk')
const forCast = require('./utilit/forcast')
const geoCode = require('./utilit/geoCode')

// port variable for heroku and local server
const port = process.env.PORT || 3000;

// defind the dir paths
const publicDir = path.join(__dirname , '../public')
const tampPath = path.join(__dirname , 'templates/views');
const partialsPath= path.join(__dirname , 'templates/partials')

// headers
app.set('view engine' , 'hbs');
app.set('views' , tampPath )
hbs.registerPartials(partialsPath)


app.use(express.static(publicDir))

app.get('' , (req , res) =>{
    res.render('index' , {
        title : 'weather app',
        name: 'created by andrew',
        created:'created by X-sama'
    })
})

.get('/about' ,(req  , res) =>{
    res.render('about' , {
        title:'welcome to about me page',
        created:'created by X-sama'
    })
})


app.get('/weather' , (req , res) =>{
    if (!req.query.adress){
        return  res.send({
            error: 'you have to provide an location in the search'
        })
    }
    geoCode(req.query.adress , (error , {lin  , long , location} = {}) =>{
        if (error){
            return res.send({
                error
            })
        }
        forCast(lin , long, (error , data) =>{

            if (error){
                return res.send({error})
            }

             res.send({
                location : location,
                forCast : data.temp,
                des : data.dis
            })
        })
    })


})

.get('/help' , (req , res) =>{
       res.render('help' , {
           title:'help page ',
           created:'created by X-sama'
       })
    })



.get('*' , (req, res) =>{
    res.render('404' , {
        title:'404 page ..!!',
        content: 'page not found..'
    })
})

app.listen(port , () =>{
    console.log('we listening to the server in port ' + port)
})