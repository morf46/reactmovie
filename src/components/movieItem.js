import React from 'react';
import { text_truncate } from '../libs/textLib';
import { ImageBaseUrl, posterSizes } from '../libs/staticData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MovieItemGenreList from './movieitemgenrelist';
import { Link } from "react-router-dom";

class MovieItem extends React.Component {



    render() {
        const { movie } = this.props;


        return (
            <div>


                <figure className="movie-item m-2" style={{ width: "14em" }}>
                    <Link to={"/Movie/" + movie.id}>
                        <img className="img-fluid" src={ImageBaseUrl + posterSizes['342'] + this.props.movie.poster_path} alt="Movie Poster" />
                    </Link>

                    <figcaption>
                        <h5 className="movie-item-caption">{text_truncate(movie.title, 26)}</h5>
                        <MovieItemGenreList genres={movie.genre_ids} />
                        <div className="rating-box">
                            <FontAwesomeIcon icon="star" className="mr-2 mb-2 rating-icon" />
                            <h4 className="rating-value">{movie.vote_average}</h4>
                        </div>
                    </figcaption>
                </figure>
            </div>
        )

    }

}


export default MovieItem;