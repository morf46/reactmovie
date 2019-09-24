import React from 'react';
import './css/bootstrap.scss';

import Footer from './components/footer';
import Header from './components/header';
import MainContainer from './components/main';
import MovieItem from './components/movieItem';
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
    /*
    #movies{
      min-height: 100vh;
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
    }*/
    return (


      <div className="App">

        <Header movie={this.state.movie} />

        <MainContainer movie={this.state.movie} />

        <section style={{ minHeight: "100vh", display: "flex", flexWrap: "wrap", alignItems: "flex-start" }}>
          {
            this.state.movies.map(x =>
              <MovieItem key={x.id} movie={x} />
            )
          }
        </section>
        <Footer />
      </div>
    );
  }
}

export default App;
