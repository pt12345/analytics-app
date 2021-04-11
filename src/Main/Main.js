import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import Currency from '../Currency/Currency';
import Percentage from '../Percentage/Percentage';
import Random from '../Random/Random';
import Stats from '../Stats/Stats';
import Treemap from '../Treemap/Treemap';
import './Main.css'

class Main extends Component {

    render() {
        
        return(
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
        )
    }
}

export default withRouter(Main)