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

        this.OnClickBack = this.OnClickBack.bind(this);
    }

    OnClickBack() {
        this.props.history.goBack();
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
            `http://h2844272.stratoserver.net/api/movie/details/${movieID}`,
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


        const { poster_path, title, original_title, vote_average, overview, videos, images, imdb_id } = this.state.movie;
        const moviePosterPath = poster_path ?
            ImageBaseUrl + posterSizes['500'] + poster_path : process.env.PUBLIC_URL + '/noimage.jpg'
        return (
            <div className="container">
                <button className="btn btn-link" onClick={() => this.OnClickBack()}>
                    <FontAwesomeIcon icon="arrow-left" size="2x" className="back-arrow mr-2 mb-2 align-middle" />
                    Go Back.
                </button>

                <div className="row">
                    <div className="col-4">
                        <img className="img-fluid" src={moviePosterPath} alt="Movie Poster " />
                    </div>
                    <div className="col-8">
                        <h2 className="display-4">{title}</h2>
                        <p className="lead">
                            <FontAwesomeIcon icon="star" className="mr-2 mb-2 rating-icon align-middle" size="1x" />
                            <span>{vote_average}</span>
                            <FontAwesomeIcon className="ml-2" icon={["fab", "imdb"]} size="1x" />
                            <a href={"http://www.imdb.com/title/" + imdb_id + "/"} target="_blank" rel="noopener noreferrer">IMDb</a>

                        </p>

                        <h4>Overview</h4>
                        <p className="mt-2">{overview}</p>
                    </div>
                    <h4>Posters</h4>
                    <div className="col-12">
                        {
                            images && images.posters && images.posters.slice(0, 6).map(image =>
                                <ImageDetail key={image.file_path} image={image} />
                            )
                        }
                    </div>
                    <h4>Videos</h4>
                    <div className="col-12">
                        {

                            videos && videos.results && videos.results.slice(0, 1).map(video =>
                                <VideoDetail key={video.id} video={video} />
                            )
                        }
                    </div>

                </div>
            </div >
        );
    }
}




export default MovieDetail;