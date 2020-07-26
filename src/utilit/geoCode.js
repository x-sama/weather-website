const request = require('request');


const geo = (address , callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiNWFsaWRqaCIsImEiOiJja2N5dGs4eXEwNHhmMnJxdjVmMHR6dnJ0In0.2IbH521V3vWV_9mn4bcZVQ&limit=3'

    request({url : url , json:true} , (error , {body}) => {
        if (error){
            callback('unable to connect to the network' , undefined)
        }else if (body.features.length === 0){
           callback('wrong location try another one' , undefined)
        }else{
            const data = {
                lin: body.features[0].center[0],
                long: body.features[0].center[1],
                location: body.features[0].place_name
            }
            callback( undefined ,data);
        }
    })
}

module.exports = geo;