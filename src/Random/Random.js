import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import ApiContext from '../ApiContext';

class Currency extends Component {

    static contextType = ApiContext;

    render() {
        
        //const randomSale = this.context.getRandom() || {}
        
        let randomSale = this.context.randomSale || {}

        if (typeof randomSale.price_old === 'undefined') {
            randomSale = {
                "title": "Searching...",
                "price_old": 0,
                "price_new": 0,
                "prics_cut": 0,
                "shop": {
                  "name": "..."
                }
              };
        }

        return(
            <div id="random" className="tile">
                <h2>Random Sale</h2>
                <p>Title: {randomSale.title}</p>
                <p>Price: ${randomSale.price_old.toFixed(2)}</p>
                <p>Sales Price: ${randomSale.price_new.toFixed(2)}</p>
                <p>Store: {randomSale.shop.name}</p>
                <button type="button" onClick={this.context.setRandom}>
                    Shuffle
                </button>
               
            </div>
        )
    }
}

export default withRouter(Currency)