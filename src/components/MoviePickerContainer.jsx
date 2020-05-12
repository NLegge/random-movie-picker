import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { movies } from '../constants/movies';
import Overlay1 from '../assets/images/overlay-1.png';
import Overlay2 from '../assets/images/overlay-2.png';
import Overlay3 from '../assets/images/overlay-3.png';
import Overlay4 from '../assets/images/overlay-4.png';
import Overlay5 from '../assets/images/overlay-5.png';
import Overlay6 from '../assets/images/overlay-6.png';
import OverlayBlood from '../assets/images/overlay-blood.png';
import LoadingVideo from '../assets/videos/Loading_Video_Horror.mp4';
import ButtonClick from '../assets/audio/button_press.mp3';
import Results from '../assets/audio/results.mp3';

const overlays = [Overlay1, Overlay2, Overlay3, Overlay4, Overlay5, Overlay6, OverlayBlood];
let imgIndex = 0;

const resultsAudio = new Audio(Results);

const movieAudio = new Audio(ButtonClick);
movieAudio.volume = 0.25;

const MoviePickerContainer = (props) => {
const [movieInfo, setMovieInfo] = useState();
const [overlay, setOverlay] = useState(imgIndex);
const [showVideo, setShowVideo] = useState(true);

const videoRef = useRef(null);

const handlePressMe = () => {
  const movie = movies[Math.floor(Math.random() * movies.length)];
  setShowVideo(true);
  videoRef.current.play();
  movieAudio.play();
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
      setOverlay(imgIndex);
      if (videoRef) {
        videoRef.current.addEventListener("ended", () => {
          setShowVideo(false);
          console.log(resultsAudio.volume);
          resultsAudio.play();
        });
      }
    },150);

  }, [videoRef]);

  return (
    <div className="movie-picker-container">
      <div className="movie-picker-relative-container">
        <video className={`loading-video${showVideo ? ' show' : ''}`} muted ref={videoRef}>
          <source src={LoadingVideo} type='video/mp4' />
        </video>
        {movieInfo && movieInfo.Poster !== 'N/A' && <img className="movie-poster" src={movieInfo.Poster} alt="movie-poster" />}
        {movieInfo && movieInfo.Poster === 'N/A' && <div className="movie-poster">{movieInfo.Title}</div>}
        {movieInfo && (
          <div className="movie-info" role="presentation">
            <p>Title: {movieInfo.Title}</p>
            <p>Year: {movieInfo.Year}</p>
            <p>Director: {movieInfo.Director}</p>
            <p>Actors: {movieInfo.Actors}</p>
          </div>
        )}
        <div className="television-overlay" style={{backgroundImage: `url(${overlays[0]})`}} role="presentation" />
        {overlay === 0 && <div className="television-overlay" style={{backgroundImage: `url(${overlays[0]})`}} role="presentation" />}
        {overlay === 1 &&  <div className="television-overlay" style={{backgroundImage: `url(${overlays[1]})`}} role="presentation" />}
        {overlay === 2 &&  <div className="television-overlay" style={{backgroundImage: `url(${overlays[2]})`}} role="presentation" />}
        {overlay === 3 &&  <div className="television-overlay" style={{backgroundImage: `url(${overlays[3]})`}} role="presentation" />}
        {overlay === 4 &&  <div className="television-overlay" style={{backgroundImage: `url(${overlays[4]})`}} role="presentation" />}
        {overlay === 5 &&  <div className="television-overlay" style={{backgroundImage: `url(${overlays[5]})`}} role="presentation" />}
        <div className="television-overlay" style={{backgroundImage: `url(${overlays[6]})`}} role="presentation" />
        <button className="press-me-btn" onClick={handlePressMe}> </button>
      </div>
    </div>
  );
}

export default MoviePickerContainer;