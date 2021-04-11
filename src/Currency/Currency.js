import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import ApiContext from '../ApiContext';

class Currency extends Component {

    static contextType = ApiContext;
    
    render() {
        
        const dollarSale = this.context.findMaxDollars() || {}

        return(
            <div className="tile">
                <h2>Best Sale by Dollars: ${(dollarSale.price_old - dollarSale.price_new).toFixed(2)}</h2>
                <p>Title: {dollarSale.title}</p>
                <p>Price: ${dollarSale.price_old.toFixed(2)}</p>
                <p>Sales Price: ${dollarSale.price_new.toFixed(2)}</p>
                <p>Store: {dollarSale.shop.name}</p>
               
            </div>
        )
    }
}

export default withRouter(Currency)