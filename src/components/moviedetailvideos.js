import React from 'react';



class VideoDetail extends React.Component {


    render() {

        const {video} = this.props;

        return (
            <div>
                <iframe title={video.name} 
                width="560" 
                height="315" 
                src={"https://www.youtube.com/embed/" + video.key} 
                frameBorder="0" 
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen></iframe>
            </div>
        )
    }

}


export default VideoDetail;