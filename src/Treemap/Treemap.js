

import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Chart } from "react-google-charts";
import ApiContext from '../ApiContext';

class Treemap extends Component {

    static contextType = ApiContext;

    render() {
        
        let totalSales = {
            "epic": this.context.epicCount,
            "gog": this.context.gogCount,
            "origin": this.context.originCount
        }

        if (typeof totalSales === 'undefined') {
            totalSales = {
                "epic": 1,
                "gog": 1,
                "origin": 1
              };
        }

        return(
            <div id="chart" className="tile">
                {totalSales.epic > 1 && <h2 id="chart-title">Current Sales by Store</h2>}
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