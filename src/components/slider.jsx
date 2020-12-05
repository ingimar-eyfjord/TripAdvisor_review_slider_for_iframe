import React, { Component } from 'react';
import Review from './singleReview'
import Logo from './logo'
import Forwards from './forwards'
import Backwards from './backwards'


let touchStart = 0;

class Slider extends Component {
    // export default function Slider(props) {
    constructor(props) {
        super(props);
        this.state = { position: 0 };
        this.onClick = this.onClick.bind(this);
        this.backwardsStyle = { display: 'none' }
        this.forwardsStyle = { display: 'block' }
    }
    onSwipeStart(e) {
        e.persist(e)
        touchStart = e.touches[0].pageX
    }
    onSwipeEnd(e) {
        e.persist(e)
        const touchEnd = e.changedTouches[0].pageX
        if ((touchStart - touchEnd) >= 100) {
            this.onClick(undefined, 'Forwards')
        } else if ((touchStart - touchEnd) <= 100) {
            this.onClick(undefined, 'Backwards')
        }
    }

    NavPointClick(e) {
        e.persist(e)
        const number = e.target.attributes.navnumber.value
        if (number === 2) {
            this.setState({ forwardsStyle: { display: 'none' } });
        } else {
            this.setState({ forwardsStyle: { display: 'block' } });
        }
        if (number === 0) {
            this.setState({ backwardsStyle: { display: 'none' } });
        } else {
            this.setState({ backwardsStyle: { display: 'block' } });
        }
        // Go over 3 times faster
        if (window.innerWidth >= 1200) {
            this.setState({ position: number * 3 });
        } else {
            /// Go one time over
            this.setState({ position: number });
        }

    }

    onClick(e, touchEvent) {

        // check if buttons should be visible
        if (this.state.position === 0) {
            this.setState({ backwardsStyle: { display: 'none' } });
        } else {
            this.setState({ backwardsStyle: { display: 'block' } });
        }

        let direction = ''
        if (e == undefined) {
            direction = touchEvent
        } else {
            if (e.target.classList.contains("Forwards")) {
                direction = "Forwards"
            }
        }

        /// move Forwards or backwards
        if (direction == "Forwards") {
            // reveal backwards button when sliding forwards for the first time
            if (this.state.position === 0) {
                this.setState({ backwardsStyle: { display: 'block' } });
            }
            if (this.state.position === 3) {
                this.setState({ forwardsStyle: { display: 'none' } });
            }
            if (this.state.position < 4) {
                this.setState({ position: this.state.position + 1 });
            }
        } else {
            // hide back button if it's the previous review is the first one.
            if (this.state.position === 1) {
                this.setState({ backwardsStyle: { display: 'none' } });
            }
            if (this.state.position !== 0) {
                this.setState({ position: this.state.position - 1 });
                // always show forwards button when going backwards
                this.setState({ forwardsStyle: { display: 'block' } });
            }
        }
    }

    componentWillMount() {
        if (this.state.position === 0) {
            this.setState({ backwardsStyle: { display: 'none' } });
        }
    }

    render() {
        const forwards = [">"]
        const back = ["<"]
        const w = window.innerWidth
        const SliderPosition = {
            transform: `translateX(-${w <= 1200 ? 100 * this.state.position : (100 / 3) * this.state.position}vw)`
        }

        let navigation = Object
        const reviews = this.props.content.reviews.map((e, index) => { return <Review key={index} number={index} reviewInfo={e}></Review> })
        if (window.innerWidth <= 1200) {
            const length = [...reviews]
            navigation = length.map((e, index) => { return <div key={index} navlength={length.length} navnumber={index} className={`Navigation ${this.state.position === index ? 'active' : ""}`} onClick={this.NavPointClick.bind(this)}></div> })
        } else {
            const length = [...reviews]
            navigation = length.splice(4).map((e, index) => { return <div key={index} navnumber={index} navlength={length.length} className={`Navigation ${Math.ceil(this.state.position / 3) === index ? 'active' : ""}`} onClick={this.NavPointClick.bind(this)} ></div > })
        }

        return (

            <div className="SliderMainContainer"
                onTouchStart={this.onSwipeStart.bind(this)}
                onTouchEnd={this.onSwipeEnd.bind(this)}
            >

                <Backwards
                    style={this.state.backwardsStyle}
                    onClick={this.onClick.bind(this)}
                    className="Backwards">{back}
                </Backwards>

                <div
                    style={SliderPosition}
                    className="SliderSlidingContainer">
                    {reviews}
                </div>

                <div className="navContainer">
                    {navigation}
                </div>
                <Forwards
                    style={this.state.forwardsStyle}
                    onClick={this.onClick.bind(this)}
                    className="Forwards">{forwards}
                </Forwards>
                <Logo className="logo"></Logo>

            </div>
        )
    }
}
export default Slider;