import React from 'react';
import HeaderSliderImage from './HeaderSliderImage';
import Swipe from 'swipejs/react';

class HeaderSlider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            CenterMovie: this.props.popular[0],
            SwipeRef: {}
        };

        
        this.handleCallback = this.handleCallback.bind(this);
        this.onTransactionEnd = this.onTransactionEnd.bind(this);
    }


    onTransactionEnd(index, elem) {

    }

    handleCallback(index, elem) {
        this.setCenterMovie(index);
    }

  
    /**
     * Sets a new center movie.
     * 
     * @param {number} index - Index of slide
     */
    setCenterMovie(index) {
        this.setState((state) => {
            return {
                CenterMovie: this.props.popular[index]
            }
        });
    }


    render() {

        let SwipeRef;
        let transitionSpeed = 1000;

        return (


            <div>

                <Swipe className="overflow-hidden header-rotate"
                    ref={x => SwipeRef = x}
                    startSlide={0}
                    speed={transitionSpeed}
                    auto={17000}
                    draggable={false}
                    continuous={true}
                    autoRestart={false}
                    disableScroll={false}
                    stopPropagation={false}
                    callback={this.handleCallback}
                    transitionEnd={this.onTransactionEnd}>

                    {
                        this.props.popular.map(x =>
                            <HeaderSliderImage movie={x} width={this.props.width} />
                        )
                    }

                </Swipe>

                <div className="header-rotate swipeCaption header-lead" >
                    <h1>
                        <span>{this.state.CenterMovie.title}</span>
                        {
                            //caption 2nd line
                            //<span>placeholder</span>
                        }

                    </h1>
                </div>

                <div className="header-rotate">
                    <ul className="swipeControl">
                        {
                            /**
                             * SwipeRef.slide(index, duration)
                             * 
                             * slide to the position matching the index (integer) (duration: speed of transition in milliseconds).
                             */
                        }
                        <li><div className="swipeControl" onClick={() => SwipeRef.slide(0, transitionSpeed)}></div></li>
                        <li><div className="swipeControl" onClick={() => SwipeRef.slide(1, transitionSpeed)}></div></li>
                        <li><div className="swipeControl" onClick={() => SwipeRef.slide(2, transitionSpeed)}></div></li>
                        <li><div className="swipeControl" onClick={() => SwipeRef.slide(3, transitionSpeed)}></div></li>
                        <li><div className="swipeControl" onClick={() => SwipeRef.slide(4, transitionSpeed)}></div></li>
                    </ul>
                </div>
            </div>
        )
    }

}



export default HeaderSlider;

