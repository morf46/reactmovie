import React from 'react';
import { ImageBaseUrl, backdropSizes } from '../libs/staticData';
import { SwipeItem } from 'swipejs/react';

class HeaderSliderImage extends React.Component {

    render() {
        return (
            <SwipeItem>
                <img className="header-image " src={ImageBaseUrl + backdropSizes['1280'] + this.props.movie.backdrop_path} style={{ width: this.props.width }} alt="Movie Header" />
            </SwipeItem>
        );
    }
}



export default HeaderSliderImage;