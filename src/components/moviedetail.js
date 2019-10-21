import React from 'react';
import { ImageBaseUrl, posterSizes } from '../libs/staticData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../css/moviedetail.css';
import { UpdateMovieDetails, getMovieById } from '../MovieApi';
import VideoDetail from './moviedetailvideos';
import ImageDetail from './moviedetailimages';



class MovieDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }


    async  componentDidMount() {
        const movieID = parseInt(this.props.match.params['id']);

        const Movie = await getMovieById(movieID);

        if (Movie) {
            this.setState({ movie: Movie });
            var hours = Math.abs(Date.now() - Movie.updatedAt) / (60 * 60 * 1000);

            if (hours > 24 || !Movie.MergedWithAPI) {
                this.fetchMovieID(movieID);
            }
            return;
        } else {
            this.fetchMovieID(movieID);
        }
    }


    fetchMovieID(movieID) {
        return fetch(
            `https://localhost:44301/movie/details/${movieID}`,
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
        if (!this.state.movie) {
            return (
                <div className="container">
                    <h2>Something went wrong.</h2>
                </div>
            );
        }


        const { poster_path, title, original_title, vote_average, overview, videos, images } = this.state.movie;
        return (
            <div className="container">
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
                                <VideoDetail key={video.id} video={video} />
                            )
                        }
                    </div>
                    <div className="col-6">
                        {
                            images && images.posters && images.posters.slice(0, 5).map(image =>
                                <ImageDetail key={image.file_path} image={image} />
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
}




export default MovieDetail;