import React from 'react';
import { genres_options } from '../libs/staticData';
import Select from 'react-select';
import chroma from 'chroma-js';

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

    const colorPrimary = '#0099ff';
    const colorBackground = '#282c34';
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
                primary25: colorPrimary,
                neutral0: colorBackground,
                neutral5: colorBackground,
                neutral10: chroma(colorBackground).darken(0.4).hex(),
                neutral20: colorPrimary,
                neutral50: colorPrimary,
                neutral60: colorPrimary,
                neutral70: colorPrimary,
                neutral80: colorPrimary,
                neutral90: colorPrimary,
                danger: '#fc03e8',
                dangerLight: chroma(colorPrimary).darken(0.4).hex()
              },
            })}
          />
        </div>

      </div>

    )
  }



}




export default GenreFilterHeader;
