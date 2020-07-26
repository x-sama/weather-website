


const form = document.querySelector('form');
const search = document.querySelector('input');
const messageOne= document.getElementById('message-1')
const messageTwo= document.getElementById('message-2')

form.addEventListener('submit' , (e) =>{
    e.preventDefault();
     const location = search.value;

    fetch("http://localhost:3000/weather/?adress=" + location).then((response) =>{
        response.json().then((data)=>{
            if (data.error){
               messageOne.innerHTML = data.error
                messageOne.style.color  = 'red'
                messageTwo.innerHTML= ''
            }else{
                messageOne.innerHTML = '<span>location</span> : ' +  data.location;
                messageOne.style.color  = 'green';
                messageTwo.style.color  = 'green';
                messageTwo.innerHTML = '<span>weather-status</span> : ' + data.des + ' <br> <br> ' + '<span>temperature</span> : ' +  data.forCast
            }
        })
    })
})












