import React from 'react';
import { throttle } from "throttle-debounce";
import { Ring } from 'react-spinners-css';



class MovieSearch extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            searchTerm: null,
            DisplaySpinner: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.SearchMovies = this.SearchMovies.bind(this);
        this.ThrottleSearchMovies = throttle(500, this.SearchMovies);
    }


    handleKeyDown(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.handleChange(event);
        }
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({ searchTerm: event.target.value, DisplaySpinner: true });
        this.ThrottleSearchMovies(this.state.searchTerm);

    }


    SearchMovies(SearchTerm) {

        if (SearchTerm && SearchTerm.length > 2) {
            const queryString = `${SearchTerm}`;
            return fetch(
                `http://h2844272.stratoserver.net/api//movie/search/${queryString}`,
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
                    this.props.SearchMoviesHandle(data, SearchTerm);
                    this.setState({ searchTerm: null, DisplaySpinner: false });
                })
                .catch((error) => {
                    this.props.SearchMoviesHandle(null, SearchTerm)
                    this.setState({ searchTerm: null, DisplaySpinner: false });
                    console.error(error);
                });


        } else {
            this.props.SearchMoviesHandle(null, "");
            this.setState({ searchTerm: null, DisplaySpinner: false });
        }


    }


    render() {

        let visibilitySpinner = this.state.DisplaySpinner ? "visible" : "hidden";

        return (

            <div className="mt-0">
                <form className="form-inline form-sm mt-0">
                    <input
                        className="input-dark form-control"
                        type="text"
                        placeholder="Search"
                        aria-label="Search"
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyDown}
                    />

                    <Ring color='#fd7e14' size={40} className="ml-1" style={{ visibility: visibilitySpinner }} />
                </form>
            </div>
        );
    }
}



export default MovieSearch;


