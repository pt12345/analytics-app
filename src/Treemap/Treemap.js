

import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Chart } from "react-google-charts";
import ApiContext from '../ApiContext';

class Treemap extends Component {

    static contextType = ApiContext;

    render() {
        
        let totalSales = this.context.totalSales();

        return(
            <div id="chart" className="tile">
                <h2>Current Sales by Store</h2>
                <Chart
                    width={"350px"}
               
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Store', 'Number of Sales'],
                        ['Epic Store', totalSales.epic],
                        ['GOG', totalSales.gog],
                        ['Origin', totalSales.origin]
                    ]}
                    rootProps={{ 'data-testid': '1' }}
                />
            </div>
          
        )
    }
}

export default withRouter(Treemap)