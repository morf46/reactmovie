import React from 'react';
import '../css/main.css';
import MovieItem from './movieitem';





class MovieContainer extends React.Component {


    render() {
        const { movies } = this.props;
        return (
            <div className="container">

                <section style={{ minHeight: "100vh", display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between" }}>

                    {movies !== null && movies !== undefined ? (
                        movies.slice(0,80).map(movie =>
                            <MovieItem key={movie.id} movie={movie} />
                        )
                    ) : (
                            <div></div>
                        )}

                </section>
            </div>
        )

    }
}

export default MovieContainer;