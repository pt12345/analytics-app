import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import ApiContext from '../ApiContext';

class Currency extends Component {

    static contextType = ApiContext;

    render() {
        
        //const randomSale = this.context.getRandom() || {}
        
        const randomSale = this.context.randomSale || {}

        return(
            <div id="random" className="tile">
                <h2>Random Sale</h2>
                <p>Title: {randomSale.title}</p>
                <p>Price: ${randomSale.price_old.toFixed(2)}</p>
                <p>Sales Price: ${randomSale.price_new.toFixed(2)}</p>
                <p>Store: {randomSale.shop.name}</p>
                <button type="button" onClick={this.context.getRandom}>
                    Shuffle
                </button>
               
            </div>
        )
    }
}

export default withRouter(Currency)