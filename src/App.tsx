import { useState } from 'react';
import './App.css';
import DetaiWeather from './components/DetailWeather';
import GeneralWeather from './components/GeneralWeather';
import SearchBar from './components/SearchBar';
import { WeatherProps } from './models';

function App() {
  const [data, setData] = useState<WeatherProps>();
  return (
    <div className='app'>
      <div className='flex-col container'>
        <div className='flex-col first-section'>
          <SearchBar setData={setData} />
          <div className='flex-col general-weather'>
            <GeneralWeather data={data} />
          </div>
          <DetaiWeather data={data} />
        </div>
      </div>
    </div>
  );
}

export default App;
