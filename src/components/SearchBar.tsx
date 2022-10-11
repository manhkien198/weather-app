import debounce from 'lodash.debounce';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { FaMicrophone, FaSearch } from 'react-icons/fa';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
export interface SearchBarProps {
  setData: Function;
}

export default function SearchBar({ setData }: SearchBarProps) {
  const [value, setValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  console.log('transcript :', transcript);
  const synth = window.speechSynthesis;
  const speak = (text: string) => {
    if (synth.speaking) {
      console.error('Busy. Speaking...');
      return;
    }

    const utter = new SpeechSynthesisUtterance(text);

    utter.onend = () => {
      console.log('SpeechSynthesisUtterance.onend');
    };
    utter.onerror = (err) => {
      console.error('SpeechSynthesisUtterance.onerror', err);
    };

    synth.speak(utter);
  };
  const fetchDataWeather = (text: string) => {
    if (!text?.length) {
      return;
    }
    fetch(
      `${process.env.REACT_APP_BASE_URL}?q=${text}&appid=${process.env.REACT_APP_API_KEY}&units=metric&lang=vi`
    )
      .then((res) => {
        return res.json();
      })
      .then((resJson) => setData(resJson))
      .catch((error) => {
        console.error('error :', error);
      });
  };
  const debounceChange = useCallback(
    debounce((nextValue) => fetchDataWeather(nextValue), 1000),
    []
  );
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
    debounceChange(value);
  };
  useEffect(() => {
    if (transcript?.length) {
      const handledText = transcript.toLowerCase();
      if (handledText.includes('thời tiết tại')) {
        const location = handledText.split('tại')[1].trim();

        setValue(location);
        debounceChange(location);
        return;
      }

      const container = document.querySelector('.container');
      if (handledText.includes('thay đổi màu nền')) {
        const color = handledText.split('màu nền')[1].trim();
        (container as HTMLElement).style.backgroundColor = color;
        return;
      }

      if (handledText.includes('màu nền mặc định')) {
        (container as HTMLElement).style.background = '';
        return;
      }

      if (handledText.includes('mấy giờ')) {
        const textToSpeech = `${moment().hours()} hours ${moment().minutes()} minutes`;
        speak(textToSpeech);
        return;
      }

      speak('Try again');
    }
  }, [transcript]);

  const handleSpeech = () => {
    if (!isRecording) {
      SpeechRecognition.startListening({
        continuous: false,
        language: 'vi-VI',
      });
    } else {
      SpeechRecognition.stopListening();
    }
    setIsRecording(!isRecording);
  };
  if (!browserSupportsSpeechRecognition) {
    speak('Browser doesnt support speech recognition');
  }
  return (
    <div className='search-bar'>
      <span className='search-icon'>
        <FaSearch />
      </span>
      <input
        type='text'
        className='search-input'
        placeholder='Tìm kiếm theo thành phố'
        value={value}
        onChange={handleSearchChange}
      />
      <button className='phone' onClick={handleSpeech}>
        {!isRecording ? <FaMicrophone /> : <div className='record-icon'></div>}
      </button>
    </div>
  );
}
