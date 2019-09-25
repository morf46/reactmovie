import React from 'react';


class GenreFilterButton extends React.Component {

     render() {

          var { id, caption } = this.props;
          return (
               <button className="btn btn-primary-outline m-2" onClick={() => this.props.filterByGenreFunc(id)} >
                    {caption}
               </button>

          )
     }



}




export default GenreFilterButton;