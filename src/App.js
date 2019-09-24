import React from 'react';
import './css/bootstrap.scss';

import Footer from './components/footer';
import Header from './components/header';
import MovieContainer from './components/moviecontainer';
import MovieItem from './components/movieitem';
import * as MovieApi from './MovieApi.js';


import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebook, faTwitter, faSnapchat, faInstagram, faImdb } from '@fortawesome/free-brands-svg-icons'
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons'



library.add(faFacebook, faTwitter, faSnapchat, faInstagram, faImdb, faHeart, faStar);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: MovieApi.getMovieAtRandom(),
      movies: MovieApi.getMoviesRating(false)
    };


    this.filterByGenre.bind(this);
  }

  /**
   * Filters movies by genre
   * 
   * @param {number} GenreID 
   */
  filterByGenre(GenreID) {
    this.setState({ movie: this.state.movie, movies: MovieApi.getMoviesRating(false, GenreID) });
  }

  render() {

    return (


      <div className="App">



        <Header movie={this.state.movie} />
        
        <div className="container d-flex flex-row  mb-1 justify-content-center">

          <button className="btn btn-primary m-2" onClick={() => this.filterByGenre(-1)} >All</button>
          <button className="btn btn-primary m-2" onClick={() => this.filterByGenre(28)} >Action</button>
          <button className="btn btn-primary m-2" onClick={() => this.filterByGenre(14)} >Fantasy</button>


        </div>
        <MovieContainer movies={this.state.movies} />


        <Footer />
      </div>
    );
  }
}

export default App;
