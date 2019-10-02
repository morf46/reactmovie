import React from 'react';
import "../css/header.css";
import { ImageBaseUrl, backdropSizes } from '../libs/staticData';


class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = this.CalculateHeaderDimensions();
    }

    render() {

        return (
            <header className="App-header"  >

                <div className="overflow-hidden header-rotate header-title">

                </div>


                <img className="header-image header-rotate" src={ImageBaseUrl + backdropSizes['1280'] + this.props.movie.backdrop_path} style={{ width: this.state.width }} alt="Movie Header" />


                <div className="header-rotate swipeCaption header-lead " >
                    <h1>
                        <span>{this.props.movie.title}</span>
                        {
                            //<span>placeholder</span>
                        }

                    </h1>
                </div>

                <div className="header-rotate">
                    <ul className="swipeControl">
                        <li><div class="swipeControl"></div></li>
                        <li><div class="swipeControl"></div></li>
                        <li><div class="swipeControl"></div></li>
                        <li><div class="swipeControl"></div></li>
                        <li><div class="swipeControl"></div></li>
                    </ul>
                </div>


            </header>
        )
    }

    CalculateHeaderDimensions() {
        return { width: window.innerWidth + window.innerWidth * 0.05 };
    }

    updateHeaderImageDimensions = () => {
        this.setState(this.CalculateHeaderDimensions());
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateHeaderImageDimensions);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateHeaderImageDimensions);
    }
}

export default Header;
