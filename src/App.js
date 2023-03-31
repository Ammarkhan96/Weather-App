import axios from 'axios';
import './App.css';
import { useState } from 'react';
import Icon from 'react-icons-kit';
import { search } from 'react-icons-kit/feather'
import { WeatherViewer } from './Components/WeatherViewer';

function App() {

  const [citySearch, setCitySearch] = useState('')
  const [cityData, setCityData] = useState(null)

  const fetchCity=(e)=>{
    e.preventDefault(e)
    axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=tG0JNumeNFsN33TSm7hgE4RkmPXjqYmi&q=${citySearch}`)
    .then((response)=>{
      setCitySearch('');
      setCityData(response.data[0]);
    }).catch(err=>console.log(err.message));
  }

  return (
    <div className="wrapper">
      <h1 className='headline'>My Weather App</h1>
      <form className='form-group custom-form' autoComplete='off' onSubmit={fetchCity}>
        <label className='para'>Search for a city to get weather data</label>
        <div className='search-box'>
         <input className='form-control' required placeholder='Enter city name...' value={citySearch}  
         onChange={(e)=>setCitySearch(e.target.value)}
         />
         <button type='submit' className='btn btn-secondary btn-sm'>
           <Icon icon={search} size={22} />
         </button>
        </div>
      </form>
      {cityData&&(
        <div style={{padding: 10+'px', width: 100+'%' }}>
          <WeatherViewer cityData={cityData}/> 
        </div>
      )}
    </div>
  );
}

export default App;
