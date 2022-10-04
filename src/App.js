import './App.css';
import React, { useState, useEffect } from "react";
import Axios from 'axios';

function App() {

  const [movieName, setMovieName] = useState('');
  const [movieReview, setReview] = useState('');
  const [movieReviewList, setMovieList] = useState([]);

  useEffect(() => {
    Axios.get('https://testing-movie-review.herokuapp.com/api/get').then((response) => {
      console.log(response.data);
      setMovieList(response.data);
    });
  }, [])

  const submitReview = () => {
    Axios.post('https://testing-movie-review.herokuapp.com/api/insert', {
      movieName: movieName,
      movieReview: movieReview,
    }).then(() => {
      alert("Successful insert");
    });
  }

  return (
    <div className="App">
      <h1>CRUD APPLICATION</h1>
      <div className="form">
        <label>Movie name:</label>
        <input type="text" name="movieName" onChange={(e) => {
          setMovieName(e.target.value);
        }} />
        <label>Review:</label>
        <input type="text" name="movieReview" onChange={(e) => {
          setReview(e.target.value);
        }} />

        <button onClick={submitReview}>Submit</button>

        {movieReviewList.map((val) => {
          return <p>MovieName: {val.movie} | Review: {val.review}</p>
        })}
      </div>
    </div>
  );
}

export default App;
