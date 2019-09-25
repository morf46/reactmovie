import React from 'react';
import "../css/header.css";
import { ImageBaseUrl, backdropSizes } from '../libs/staticData';


class Header extends React.Component {

    constructor(props)
    {
        super(props);

        this.state = this.CalculateHeaderDimensions();
    }

    render() {

        return (
            <header className="App-header"  >

                <div className="overflow-hidden header-rotate header-title">

                </div>

                <img className="header-image header-rotate" src={ImageBaseUrl + backdropSizes['1280'] + this.props.movie.backdrop_path} style={{ width: this.state.width }} alt="Movie Header" />

                <h1 className="header-lead overflow-hidden header-rotate" >
                    {this.props.movie.title}
                </h1>

            </header>
        )
    }

    CalculateHeaderDimensions(){
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
