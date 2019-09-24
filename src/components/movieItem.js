import React from 'react';
import { text_truncate } from '../libs/textLib';
import '../css/movieItem.css';
import { ImageBaseUrl, posterSizes } from '../libs/staticUrls'

class MovieItem extends React.Component {

    render() {
        const { movie } = this.props;

        return (
            <div>
                <figure className="movie-item m-2" style={{width:"14em"}} >
                    <img className="img-fluid" src={ImageBaseUrl + posterSizes['342'] + this.props.movie.poster_path} alt="Movie Poster" />

                    <figcaption>
                        <h5>{text_truncate(movie.title, 26)}</h5>
                        <p>genres,genres</p>
                        <div className="rating">
                            <i className="fa fa-heart"></i>
                            <h4>{movie.vote_average}</h4>
                        </div>
                    </figcaption>
                </figure>
            </div>
        )

    }

}


export default MovieItem;