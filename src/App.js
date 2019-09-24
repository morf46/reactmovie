import React from 'react';
import './css/bootstrap.scss';

import Footer from './components/footer';
import Header from './components/header';
import MovieContainer from './components/moviecontainer';
import MovieItem from './components/movieitem';
import * as MovieApi from './MovieApi.js';


import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebook, faTwitter, faSnapchat, faInstagram, faImdb } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'



library.add(faFacebook, faTwitter, faSnapchat, faInstagram, faImdb, faCheckSquare, faCoffee);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: MovieApi.getMovieAtRandom(),
      movies: MovieApi.getMoviesRating(false)
    };


  }
  render() {
 
    return (


      <div className="App">

        <Header movie={this.state.movie} />

        <MovieContainer movies={this.state.movies} />

        
        <Footer />
      </div>
    );
  }
}

export default App;
