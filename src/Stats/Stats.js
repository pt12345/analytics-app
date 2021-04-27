import React, { Component} from 'react'
import { withRouter } from 'react-router-dom';
import ApiContext from '../ApiContext';

class Stats extends Component {

    static contextType = ApiContext;

    render() {

        let totalSales = this.context.totalSalesCount || {};
        let greaterThan = this.context.greaterThanCount || {};
        let epicSales = this.context.totalEpicCount || {};
        let gogSales = this.context.totalGogCount || {};
        let originSales = this.context.totalOriginCount || {};
        let totalDollars = this.context.totalDollarAmount || {};
        
        return(
            <div id="history">
                <h2>History</h2>
                <p>Number of Sales Greater Than 90%</p>
                <p>{greaterThan.counts}</p>
                <p>Total Savings in Dollars</p>
                <p>${totalDollars.dollars.toFixed(2)}</p>
                <p>Total Sales Analyzed</p>
                <p>{totalSales.counts}</p>
                <p>Epic Store</p>
                <p>{epicSales.counts}</p>
                <p>GOG</p>
                <p>{gogSales.counts}</p>
                <p>Origin</p>
                <p>{originSales.counts}</p>

            </div>
        )
    }
}

export default withRouter(Stats)