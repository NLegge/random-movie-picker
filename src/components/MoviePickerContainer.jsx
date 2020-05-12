import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { movies } from '../constants/movies';
import Overlay1 from '../assets/images/overlay-1.png';
import Overlay2 from '../assets/images/overlay-2.png';
import Overlay3 from '../assets/images/overlay-3.png';
import Overlay4 from '../assets/images/overlay-4.png';
import Overlay5 from '../assets/images/overlay-5.png';
import Overlay6 from '../assets/images/overlay-6.png';
import LoadingVideo from '../assets/videos/Loading_Video_Horror.mp4';

const overlays = [Overlay1, Overlay2, Overlay3, Overlay4, Overlay5, Overlay6];
let imgIndex = 0;

const MoviePickerContainer = (props) => {
const [movieInfo, setMovieInfo] = useState();
const [overlay, setOverlay] = useState();
const [showVideo, setShowVideo] = useState(true);

const videoRef = useRef(null);

const handlePressMe = () => {
  const movie = movies[Math.floor(Math.random() * movies.length)];
  setShowVideo(true);
  videoRef.current.play();
  axios.get(`https://www.omdbapi.com/?apiKey=1183a20f&t=${movie}`)
    .then(res => {
      setMovieInfo(res.data);
    })
    .catch(err => console.error(err))
}

  useEffect(() => {
    setInterval(() => {
      if(imgIndex === 5) {
        imgIndex = 0;
      } else {
       imgIndex++;
      }
      setOverlay(overlays[imgIndex]);
      if (videoRef) {
        videoRef.current.addEventListener("ended", () => setShowVideo(false));
      }
    },150);

  }, [videoRef]);

  return (
    <div className="movie-picker-container">
      <div className="movie-picker-relative-container">
        <video className={`loading-video${showVideo ? ' show' : ''}`} muted ref={videoRef}>
          <source src={LoadingVideo} type='video/mp4' />
        </video>
        {movieInfo && <img className="movie-poster" src={movieInfo.Poster} alt="movie-poster" />}
        <div className="television-overlay" style={{backgroundImage: `url(${overlays[0]})`}} role="presentation" />
        <div className="television-overlay" style={{backgroundImage: `url(${overlay})`}} role="presentation" />
        <button className="press-me-btn" onClick={handlePressMe}> </button>
      </div>
    </div>
  );
}

export default MoviePickerContainer;