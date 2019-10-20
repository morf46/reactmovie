import React from 'react';
import { ImageBaseUrl, posterSizes } from '../libs/staticData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../css/moviedetail.css';
import { UpdateMovieDetails } from '../MovieApi';

class MovieDetail extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            movie: props.movie
        }
    }

    componentDidMount() {
        const { id } = this.props.movie;

        return fetch(
            `https://localhost:44301/movie/details/${id}`,
            {
                method: 'GET'
            }
        )
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('Something went wrong ...');
                } else {
                    return response.json();
                }

            }).then(data => {
                return UpdateMovieDetails(data);

            }).then(data => {
                this.setState({ movie: data });
            }
            )
            .catch((error) => {

                console.error(error);
            });

    }

    render() {
        const { poster_path, title, original_title, vote_average, overview, videos, images } = this.state.movie;
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
                    <div className="col-6">
                        {
                            videos && videos.results && videos.results.slice(0, 5).map(video =>
                                <p key={video.id}>
                                    <iframe title={video.name} width="560" height="315" src={"https://www.youtube.com/embed/" + video.key} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                </p>
                            )
                        }
                    </div>
                    <div className="col-6">
                        {
                            images && images.posters && images.posters.slice(0, 5).map(image =>
                                <div key={image.file_path}>
                                    <img src={ImageBaseUrl + posterSizes['500'] + image.file_path} alt="Movie Poster"/>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
}




export default MovieDetail;