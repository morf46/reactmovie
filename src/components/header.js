import React from 'react';
import "../css/header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            imageURL: "http://image.tmdb.org/t/p/w1280"
        };
    }
    //width: 105%; margin-left: -4%; padding-top: 50px; position: relative; z-index: 5; padding-bottom: 5px; "
    render() {

        return (

            <header className="App-header"  >

                <div className="overflow-hidden header-rotate header-title">

                </div>

                <img className="header-image header-rotate" src={this.state.imageURL + this.props.movie.backdrop_path} style={{ width: window.innerWidth + window.innerWidth * 0.05 }} alt="Movie Header" />

                <h1 className="header-lead overflow-hidden header-rotate" >
                    {this.props.movie.title}
                </h1>

            </header>
        )
    }
}

export default Header;
