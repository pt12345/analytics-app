import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom';
import './Start.css'
import { Animate } from "react-simple-animate";

class Start extends Component {

    render() {
        
        return(
            <Fragment>
                <p id="intro-message">Game Analytics compares video game sales across Origin, GOG and Epic to find you the best deals on games!</p>
                <Animate
                    play={true} // Toggle when animation should start
                    duration = {1}
                    start={{
                        transform: "translateX(-1000px)"
                    }}
                    end={{ transform: "translateX(0px)" }}
                    >
                    <Link id="start-link" to="/main"><h2 id="start-text">View Sales</h2></Link>
                    </Animate>
            </Fragment>
        )
    }
}

export default withRouter(Start)