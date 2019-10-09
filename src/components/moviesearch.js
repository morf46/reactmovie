import React from 'react';
import { debounce } from "debounce";


class MovieSearch extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            searchTerm: null
        }

        this.handleChange = this.handleChange.bind(this);
        this.SearchMovies = debounce(this.SearchMovies, 500);
    }

    handleChange(event) {
        this.setState({ searchTerm: event.target.value });
        this.SearchMovies(this.state.searchTerm);

    }

    SearchMovies = (SearchTerm) => {

        const queryString = `term=${SearchTerm}`;
        return fetch(
            `https://localhost:44301/movie/search/${queryString}`,
            {
                method: 'GET'
            }
        )
            .then(r => r.json())
            .then(json => this.props.SearchMoviesHandle(SearchTerm))
            .catch(error => {
                console.error(error);
                return [];
            });
       
    }


    render() {
        return (

            <div className="md-form mt-0">
                <input
                    className="form-control"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={this.handleChange} />
            </div>
        );
    }
}



export default MovieSearch;


