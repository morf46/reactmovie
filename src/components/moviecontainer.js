import React from 'react';
import '../css/main.css';
import MovieItem from './movieitem';




class MovieContainer extends React.Component {

    render() {

        return (
            <div className="container">

                <section style={{ minHeight: "100vh", display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent:"space-between" }}>
                    {
                        this.props.movies.map(x =>
                            <MovieItem key={x.id} movie={x} />
                        )
                    }
                </section>
            </div>
        )

    }
}

export default MovieContainer;