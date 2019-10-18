import React from 'react';
import { ImageBaseUrl, posterSizes } from '../libs/staticData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import '../css/moviedetail.css';

class MovieDetail extends React.Component {

    static propTypes={
        ClickBackHandle: PropTypes.func.isRequired
    }

    render() {
        const { poster_path, title, original_title, vote_average, overview } = this.props.movie;
        return (
            <div className="container">

                <FontAwesomeIcon icon="arrow-left" size="6x" className="back-arrow mr-2 mb-2" onClick={() => this.props.ClickBackHandle("")} />

                <div className="row">
                    <div className="col-4">
                        <img className="img-fluid" src={ImageBaseUrl + posterSizes['500'] + poster_path} alt="Movie Poster " />
                    </div>
                    <div className="col-8">
                        <h2 className="display-4">{title}</h2>
                        <p className="lead">
                            <span>{vote_average}</span>
                            <span>{original_title}</span>
                        </p>
                        <p className="mt-4">{overview}</p>
                    </div>
                </div>
            </div>
        );
    }
}




export default MovieDetail;