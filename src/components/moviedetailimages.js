import React from 'react';
import { posterSizes, ImageBaseUrl } from '../libs/staticData';



class ImageDetail extends React.Component {


    render() {

        const { image } = this.props;

        return (
            
                <img src={ImageBaseUrl + posterSizes['500'] + image.file_path} alt="Movie Poster" />
            
        )
    }

}


export default ImageDetail;