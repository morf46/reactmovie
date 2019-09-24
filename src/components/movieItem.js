import React from 'react'
import { text_truncate } from '../libs/textLib';
import '../css/movieItem.css';

class MovieItem extends React.Component {

    render() {
        const { movie } = this.props;

        return (
            <div>
                <figure className="movie-item" style={{width:"200px"}}>
                    <img className="img-fluid" src={"http://image.tmdb.org/t/p/w500/" + this.props.movie.poster_path} alt="Movie Poster" />

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