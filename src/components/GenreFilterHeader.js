import React from 'react';
import GenreFilterButton from './GenreFilterButton';
import { genres_map } from '../libs/staticData';


class GenreFilterHeader extends React.Component {

  render() {


    return (
      <div className="container d-flex  flex-wrap mb-1 justify-content-center">

        <GenreFilterButton id={-1} caption="All" filterByGenreFunc={this.props.filterByGenreFunc} />

        {
          Object.entries(genres_map).map(([k, v]) =>


            <GenreFilterButton key={k} id={parseInt(k)} caption={v} filterByGenreFunc={this.props.filterByGenreFunc} />

          )
        }

      </div>

    )
  }



}




export default GenreFilterHeader;