import moment from 'moment';
import * as React from 'react';
import { WeatherProps } from '../models';

export interface DetaiWeatherProps {
  data: WeatherProps | undefined;
}

export default function DetaiWeather({ data }: DetaiWeatherProps) {
  const formatTime = 'HH:mm';
  return (
    <div className='weather-detail w-full'>
      <div className='flex-row w-full'>
        <div className='item'>
          <div className='white'>MT Mọc</div>
          <div className='white opacity'>
            {data
              ? `${moment(data?.sys?.sunrise * 1000).format(formatTime)} AM`
              : '--'}
          </div>
        </div>
        <div className='item'>
          <div className='white'>MT Lặn</div>
          <div className='white opacity'>
            {data
              ? `${moment(data?.sys?.sunset * 1000).format(formatTime)} PM`
              : '--'}
          </div>
        </div>
      </div>
      <div className='flex-row'>
        <div className='item'>
          <div className='white'>Độ ẩm</div>
          <div className='white opacity'>
            {data ? `${data?.main?.humidity} %` : '--'}
          </div>
        </div>
        <div className='item'>
          <div className='white'>Gió</div>
          <div className='white opacity'>
            {data ? `${(data?.wind?.speed * 3.6).toFixed(2)} km/h` : '--'}
          </div>
        </div>
      </div>
    </div>
  );
}
