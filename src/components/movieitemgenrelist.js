import React from 'react';
import { genres_map } from '../libs/staticData';

class MovieItemGenreList extends React.Component {

    render() {
        const { genres } = this.props;

        return (
            <p className="movie-item-genre"> {
                genres && genres.map(x => genres_map[x]).join(", ")
                }
            </p>
        )

    }



}




export default MovieItemGenreList;