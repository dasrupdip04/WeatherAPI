document.addEventListener('DOMContentLoaded', function(){
    const cityinp = document.getElementById('cityinp');
    const getbtn = document.getElementById('getbtn');
    const  cityname= document.getElementById('cityname');
    const  tempe= document.getElementById('temp');
    const descr = document.getElementById('desc');
    const info = document.getElementById('info');
    const error = document.getElementById('error');
    const api = "ee9c88457d8a5130a9d3ac2addb78204"  //env variables

    getbtn.addEventListener('click',async()=>{
        const cname = cityinp.value.trim();
        if(!cname) showerror();

        try{
            const weatherdata = await fetchdata(cname);
            displayweather(weatherdata);

        } catch(error){
            showerror();
        }
    })


    async function fetchdata(city){
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api}`;
        const response = await fetch(url);
        
        if(!response.ok) {throw new Error("City not found");}

        const data = await response.json(); //converts it to object to make it readable
        return data;

    }

    function displayweather(data){
        console.log(data); // we can see whatever info we need and what object name and other needed to call the function. understand the response
        
        const {name,main,weather} = data  //we extract whatever things we need like name, main and weather among others. main is a separate object so we need .function to extract it

        cityname.textContent= name;
        tempe.textContent=`Temperature: ${main.temp}`
        descr.textContent=`Description: ${weather[0].description}`


        info.classList.remove('hidden');
        error.classList.add('hidden');
    }

    function showerror(){
        info.classList.add('hidden');
        error.classList.remove('hidden');
    }

})