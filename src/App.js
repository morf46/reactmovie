import React from 'react';
import './css/bootstrap.scss';

import Footer from './components/footer';
import Header from './components/header';
import MovieContainer from './components/moviecontainer';
import GenreFilterHeader from './components/GenreFilterHeader';

import * as MovieApi from './MovieApi.js';


import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebook, faTwitter, faSnapchat, faInstagram, faImdb } from '@fortawesome/free-brands-svg-icons'
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons'





library.add(faFacebook, faTwitter, faSnapchat, faInstagram, faImdb, faHeart, faStar);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      popular: MovieApi.getPopularMovies(),
      movies: MovieApi.getMoviesRating(false)
    };


    this.filterByGenre = this.filterByGenre.bind(this);
  }

  /**
   * Filters movies by genre
   * 
   * @param {number} GenreID 
   */
  filterByGenre(GenreID) {
    this.setState({ movies: MovieApi.getMoviesRating(false, GenreID) });
  }

  render() {

    return (


      <div className="App">



        <Header popular={this.state.popular} />


        <GenreFilterHeader filterByGenreFunc={this.filterByGenre} />

        <MovieContainer movies={this.state.movies} />


        <Footer />
      </div>
    );
  }
}

export default App;
