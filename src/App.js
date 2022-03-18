import {React, useEffect, useState} from 'react'
import './App.css';
import InputSearch from './components/InputSearch'
function App() {
    const [datos,setDatos] = useState({
      city:''
    });

    const handleInputChange = (event) =>{
      setDatos({
          ...datos,
          [event.target.name]:event.target.value.toLowerCase().replace(/ /g,"-")
      })
    }
    const enviarDatos=(event)=>{
      event.preventDefault()
      
      fetchApi();
    }

   var latInput=0;
   var longInput=0;
    const url = 'https://search.reservamos.mx/api/v2/places';
    const [weatherData, setWeather]=useState();

      const fetchApi =async()=>{
        const response = await fetch(url);
        const responseJSON = await response.json();
        for(let i=0;i<responseJSON.length;i++){
          if(responseJSON[i].slug==datos.city){
            latInput=responseJSON[i].lat;
            longInput=responseJSON[i].long;
          }
        }
        if(latInput==0 || longInput==0){
          console.log('')
        }
        else{
          const weather = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latInput}&lon=${longInput}&exclude=hourly&units=metric&appid=9219b5bdaac4d5942fd044824b5f5f3f`);
          const weatherJSON = await weather.json();
          setWeather(weatherJSON.daily);
        }
      }
      const days=['Fri','Sat','Sun','Mon','Tues','Wed','Thurs','Fri']
      
      useEffect(()=>{
        fetchApi()
      },[]);
  return (  
    <div className="App">
      
      <div className='containerApp'>
        <InputSearch enviarDatos={enviarDatos} handleInputChange={handleInputChange}/>
      </div>
      <div className='infoContainer'>
        {!weatherData ? 'Please input a city':
          weatherData.map((data,index)=>{
            return(
              <div>
              <div className='daysCard'>
                <h4>{days[index]} </h4>
                <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}></img>
                <p>{data.temp.day}°C</p>
                <div>
                  <p className='hotWeather'>{data.temp.max}°C</p>/
                  <p className="coldWeather">{data.temp.min}°C</p>
                </div>
              </div>
              </div>
            )
          })
        }
      </div>
    </div>
    
  );
}
export default App;
