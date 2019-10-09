import React from 'react';
import { genres_options } from '../libs/staticData';
import Select from 'react-select';
import chroma from 'chroma-js';
import MovieSearch from './moviesearch';

class GenreFilterHeader extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedOption: null
    }
  }

  handleChange = selectedOption => {
    this.setState({
      selectedOption
    });

    let genreArray = [];
    if (selectedOption !== null && selectedOption !== undefined && selectedOption.length > 0) {
      genreArray = selectedOption.map(x => parseInt(x.value));
    }

    this.props.filterByGenreFunc(genreArray);

  };

  render() {

    const colorPrimary = '#ffc107';
    const colorBackground = '#282c34';
    const colorPrimaryOrange = '#fd7e14';
    const { selectedOption } = this.state;

    return (
      <div className="container d-flex  flex-wrap mb-1 justify-content-center">

        <div className="col-4">
          <Select
            onChange={this.handleChange}
            value={selectedOption}
            isMulti={true}
            isSearchable={true}
            closeMenuOnSelect={true}
            options={genres_options}
            theme={theme => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                primary: colorPrimaryOrange,
                primary75: colorPrimaryOrange,
                primary50: colorPrimaryOrange,
                primary25: colorPrimary,
                neutral0: colorBackground,
                neutral5: colorBackground,
                neutral10: chroma(colorBackground).darken(0.4).hex(),
                neutral20: colorPrimary,
                neutral30: colorPrimaryOrange,
                neutral50: colorPrimary,
                neutral60: colorPrimary,
                neutral70: colorPrimary,
                neutral80: colorPrimary,
                neutral90: colorPrimary,
                danger: '#e83e8c',
                dangerLight: chroma(colorPrimary).darken(0.4).hex()
              },
            })}
          />
        </div>

        <MovieSearch SearchMoviesHandle={this.props.SearchMoviesHandle} />

      </div>

    )
  }



}




export default GenreFilterHeader;
