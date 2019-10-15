import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';

const Movie = (props) => {
  const [movie, setMovie] = useState();
  console.log(movie);
 
  useEffect(() => {
    const id = Number(props.match.params.id);
    // change ^^^ that line and grab the id from the URL
    // You will NEED to add a dependency array to this effect hook

       axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(response => {
          console.log(response);
          setMovie(response.data);
        })
        .catch(error => {
          console.error(error);
        });

  },[]);
  
  const saveMovie = () => {
    props.addToSavedList(movie)
  }

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const { title, director, metascore, stars } = movie;
  return (
    
    <div className="save-wrapper">
      <MovieCard title={title} director={director} metascore={metascore} stars={stars}/>
      <div onClick={saveMovie} className="save-button">Save</div>
    </div>
  );
}

export default Movie;
