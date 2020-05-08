import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Welcome = (props) => {
const [poster, setPoster] = useState()

  useEffect(() => {
    axios.get("http://www.omdbapi.com/?apiKey=1183a20f&t=fargo").then(
      (res => console.log(res))
    )
    // setPoster(res.url);
  }, []);

  return (
    <h1>Hello, {props.name}</h1>
  );
}

export default Welcome;