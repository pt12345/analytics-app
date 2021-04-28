import React, { Component} from 'react'
import { withRouter } from 'react-router-dom';
import ApiContext from '../ApiContext';

class Percentage extends Component {

    static contextType = ApiContext;

    
    render() {
        let percentSale = this.context.findMaxPercent() || {}

        if (typeof percentSale.price_old === 'undefined') {
            percentSale = {
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
            <div className="tile">
                <h2>Best Sale by Percentage: {percentSale.price_cut}%</h2>
                <p>Title: {percentSale.title}</p>
                <p>Price: ${percentSale.price_old.toFixed(2)}</p>
                <p>Sales Price: ${percentSale.price_new.toFixed(2)}</p>
                <p>Store: {percentSale.shop.name}</p>
               
            </div>
        )
    }
}

export default withRouter(Percentage)