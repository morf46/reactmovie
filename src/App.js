import React from 'react';
import './css/bootstrap.scss';

import { HashRouter, Switch, Route } from "react-router-dom";
import Footer from './components/footer';
import Header from './components/header';
import MovieContainer from './components/moviecontainer';
import GenreFilterHeader from './components/GenreFilterHeader';
import MovieDetail from './components/moviedetail';

import * as MovieApi from './MovieApi.js';


import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebook, faTwitter, faSnapchat, faInstagram, faImdb } from '@fortawesome/free-brands-svg-icons'
import { faHeart, faStar, faArrowLeft } from '@fortawesome/free-solid-svg-icons'



library.add(faFacebook, faTwitter, faSnapchat, faInstagram, faImdb, faHeart, faStar, faArrowLeft);


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      popular: MovieApi.getPopularMovies(),
      movies: null,
      searchTerm: null,
      genreID: null,
      SelectedMovie: null
    };



    this.filterByGenre = this.filterByGenre.bind(this);
    this.filterBySearchTerm = this.filterBySearchTerm.bind(this);
    this.setSelectedMovie = this.setSelectedMovie.bind(this);
    this.RetrieveSearchMovies = this.RetrieveSearchMovies.bind(this);
    this.clearMovieSearch = this.clearMovieSearch.bind(this);
    this.clearSelectedMovie = this.clearSelectedMovie.bind(this);
  }

  /**
   * Filters movies by genre
   * 
   * @param {number} GenreID 
   */
  async filterByGenre(GenreID) {
    let FilteredMovies = await MovieApi.getMoviesRating(false, GenreID, this.state.searchTerm);
    this.setState({ movies: FilteredMovies, genreID: GenreID });
  }



  /**
   * Clears any movie search
   */
  clearMovieSearch() {
    this.filterBySearchTerm(null);
  }
  /**
   * Filters movies by SearchTerm
   * 
   * @param {string} SearchTerm 
   */
  async filterBySearchTerm(SearchTerm) {
    let FilteredMovies = await MovieApi.getMoviesRating(false, this.state.genreID, SearchTerm);
    this.setState({ movies: FilteredMovies, searchTerm: SearchTerm });

  }

  /**
   * Retrieve Search Results and set states
   * 
   * @param {Movies|Array} NewMovieSearchResults - Json from response containing movies
   * @param {string} SearchTerm 
   */
  RetrieveSearchMovies(NewMovieSearchResults, SearchTerm) {

    if (NewMovieSearchResults) {
      MovieApi.AppendNewMovies(NewMovieSearchResults);
    }

    this.filterBySearchTerm(SearchTerm);

  }

  /**
   * Sets a new Movie as Selection
   * 
   * @param {object} NewMovie - the new movie.
   */
  setSelectedMovie(NewMovie) {

    this.setState({ SelectedMovie: NewMovie });

  }

  /**
   * 
   * Clears Sleected Movie
   * 
   */
  clearSelectedMovie() {
    this.setSelectedMovie(null);
  }

  async componentDidMount() {

    let FilteredMovies = await MovieApi.getMoviesRating(false);
    this.setState({
      movies: FilteredMovies,

    });

  }


  render() {



    return (

      <HashRouter>
        <div className="App">



          <Header popular={this.state.popular} />


          <Switch>

            
            <Route exact path="/movie/:id" component={MovieDetail} />

            <Route>
              <GenreFilterHeader filterByGenreFunc={this.filterByGenre} SearchMoviesHandle={this.RetrieveSearchMovies} />
              <MovieContainer movies={this.state.movies} SetSelectedMovieHandle={this.setSelectedMovie} />
            </Route>

          </Switch>


          <Footer />
        </div>
      </HashRouter>
    );
  }
}

export default App;
