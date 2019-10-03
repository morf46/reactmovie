import React from 'react';
import "../css/header.css";
import HeaderSlider from './HeaderSlider';

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            swipeWidth: this.CalculateHeaderDimensions(),
            popular: this.props.popular
        };
    }

    slider = {};

    render() {

        return (
            <header className="App-header">

                <div className="overflow-hidden header-rotate header-title">

                </div>

                <HeaderSlider popular={this.props.popular} width={this.state.width} />

            </header>
        )
    }

    CalculateHeaderDimensions() {
        return { width: window.innerWidth + window.innerWidth * 0.05 };
    }

    updateHeaderImageDimensions = () => {
        this.setState((state) => {
            return {
                swipeWidth: this.CalculateHeaderDimensions()
            }
        });
    }
    
    componentDidMount() {
        window.addEventListener('resize', this.updateHeaderImageDimensions);

    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateHeaderImageDimensions);
    }
}

export default Header;
