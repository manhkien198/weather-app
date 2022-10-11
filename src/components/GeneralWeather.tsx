import { WeatherProps } from '../models';
import { capitalizeString } from '../utils/capitalize';

export interface GeneralWeatherProps {
  data: WeatherProps | undefined;
}

export default function GeneralWeather({ data }: GeneralWeatherProps) {
  return (
    <div className='flex-col weather-container'>
      <h2 className='center white city'>{data?.name || '--'}</h2>
      <p className='center white desc'>
        {data ? capitalizeString(data?.weather?.[0]?.description) : '--'}
      </p>
      <img
        src={`https://openweathermap.org/img/wn/${
          data ? data?.weather?.[0]?.icon : '10d'
        }@2x.png`}
        alt='weather-icon'
      />
      <h4 className='center white temperature'>
        {data ? `${Math.round(data?.main?.temp)}°C` : '--'}
      </h4>
    </div>
  );
}
