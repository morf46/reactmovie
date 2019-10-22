import React from 'react';
import { debounce } from "debounce";




class MovieSearch extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            searchTerm: null
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.SearchMovies = debounce(this.SearchMovies, 150);
    }


    handleKeyDown(event) {
        if (event.key === 'Enter') {
            this.handleChange(event);
        }
    }

    handleChange(event) {


        this.setState({ searchTerm: event.target.value });
        this.SearchMovies(this.state.searchTerm);

    }

    SearchMovies = (SearchTerm) => {

        if (SearchTerm && SearchTerm.length > 2) {
            const queryString = `${SearchTerm}`;
            return fetch(
                `https://localhost:44301/movie/search/${queryString}`,
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

                }).then(data =>
                    this.props.SearchMoviesHandle(data, SearchTerm)
                    )
                .catch((error) => {
                    this.props.SearchMoviesHandle(null, SearchTerm)
                    console.error(error);
                });


        } else {
            this.props.SearchMoviesHandle(null, SearchTerm);
        }


    }


    render() {
        return (

            <div className="md-form mt-0">
                <input
                    className="input-dark form-control "
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                    />
            </div>
        );
    }
}



export default MovieSearch;


