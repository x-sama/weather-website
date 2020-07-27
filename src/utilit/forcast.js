const request = require('request');



const forCast = (lin , lon ,  callback)=>{

    const url = "http://api.weatherstack.com/current?access_key=882abfbc820df31fa071b5e62a65d323&query="+ lin+"," + lon;

    request({url:url , json:true} , (error , {body}) =>{
        if (error){
            callback('Unable to connect to the network' , undefined)
        }else if ( body.error){
            callback('the city not correct try another one' , undefined)
        }else{
            const data = {
                temp : body.current.temperature,
                feelslike: body.current.feelslike,
                dis : body.current.weather_descriptions[0],
                isDay : body.current.is_day,

            }
            callback(undefined , data)
        }
    })

}

module.exports = forCast;