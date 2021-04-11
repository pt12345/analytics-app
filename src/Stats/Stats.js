import React, { Component} from 'react'
import { withRouter } from 'react-router-dom';
import ApiContext from '../ApiContext';

class Stats extends Component {

    static contextType = ApiContext;

    render() {

        let totalSales = this.context.totalSales();
        
        return(
            <div>
                <h2>History</h2>
                <p>Number of Sales Greater Than 90%</p>
                <p>{this.context.greaterThanNintey()}</p>
                <p>Total Savings in Dollars</p>
                <p>${this.context.totalDollarSavings().toFixed(2)}</p>
                <p>Total Sales Analyzed</p>
                <p>{totalSales.all}</p>
                <p>Epic Store</p>
                <p>{totalSales.epic}</p>
                <p>GOG</p>
                <p>{totalSales.gog}</p>
                <p>Origin</p>
                <p>{totalSales.origin}</p>

            </div>
        )
    }
}

export default withRouter(Stats)