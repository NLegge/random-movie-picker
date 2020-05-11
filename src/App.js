import React from 'react';
import BackgroundVideo from './assets/videos/horror_background.mp4';
import './scss/App.scss';
import MoviePickerContainer from './components/MoviePickerContainer';

function App() {
  return (
    <div className="App">
      <video className='background-video' autoPlay loop muted>
        <source src={BackgroundVideo} type='video/mp4' />
      </video>
      <MoviePickerContainer />
    </div>
  );
}

export default App;
