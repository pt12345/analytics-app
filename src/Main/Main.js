import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom';
import Currency from '../Currency/Currency';
import Percentage from '../Percentage/Percentage';
import Random from '../Random/Random';
import Stats from '../Stats/Stats';
import Treemap from '../Treemap/Treemap';
import './Main.css'
import { Animate } from "react-simple-animate";

class Main extends Component {

    render() {
        
        return(
            <Fragment>
                <div id="loading-container">
            <Animate
                play={true}
                duration = {9}
                start={{
                    transform: "translateX(-100px)"
                }}
                end={{ transform: "translateX(2000px)" }}
                >
                <p>...Searching...</p>
            </Animate></div>
            <div id="metrics-container">

            <aside id="stats">
                <Stats/>
            </aside>
            <section id="metrics-all">
                <div className="metrics-group">
                    <Percentage/>
                    <Currency/>
                </div>
                <div className="metrics-group">
                    <Random/>
                    <Treemap/>
                </div>
            </section>
            </div>
            </Fragment>
        )
    }
}

export default withRouter(Main)