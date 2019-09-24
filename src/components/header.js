import React from 'react';
import "../css/header.css";
import { ImageBaseUrl, backdropSizes } from '../libs/staticData';


class Header extends React.Component {
    
    render() {

        return (
            <header className="App-header"  >

                <div className="overflow-hidden header-rotate header-title">

                </div>

                <img className="header-image header-rotate" src={ImageBaseUrl + backdropSizes['1280'] +this.props.movie.backdrop_path} style={{ width: window.innerWidth + window.innerWidth * 0.05 }} alt="Movie Header" />

                <h1 className="header-lead overflow-hidden header-rotate" >
                    {this.props.movie.title}
                </h1>

            </header>
        )
    }
}

export default Header;
