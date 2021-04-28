import React, { Component} from 'react'
import { withRouter } from 'react-router-dom';
import { Animate } from 'react-simple-animate';
import ApiContext from '../ApiContext';
import './Stats.css'
class Stats extends Component {

    static contextType = ApiContext;

    render() {

        let totalSales = this.context.totalSalesCount || {};
        let greaterThan = this.context.greaterThanCount || {};
        let epicSales = this.context.totalEpicCount || {};
        let gogSales = this.context.totalGogCount || {};
        let originSales = this.context.totalOriginCount || {};
        let totalDollars = this.context.totalDollarAmount || {};
        
        if (typeof totalDollars.dollars === 'undefined') {
            totalDollars = {
                "dollars": 0
              };
        }

        return(
            <div id="history">
                <h2>History</h2>
                <p>Number of Sales Greater Than 90%</p>
                <Animate
                    play={greaterThan.counts>0} // Toggle when animation should start
                    duration = {1}
                    start={{
                        transform: "translateX(-1000px)"
                    }}
                    end={{ transform: "translateX(0px)" }}
                    >
                <p className="history-metrics">{greaterThan.counts}</p>
                </Animate>
                <p>Total Savings in Dollars</p>
                <Animate
                    play={totalDollars.dollars.toFixed(2)!=="0.00"} // Toggle when animation should start
                    duration = {1}
                    delay = {.5}
                    start={{
                        transform: "translateX(-1000px)"
                    }}
                    end={{ transform: "translateX(0px)" }}
                    >
                <p className="history-metrics">${totalDollars.dollars.toFixed(2)}</p>
                </Animate>
                <p>Total Sales Analyzed</p>
                <Animate
                    play={totalSales.counts>0} // Toggle when animation should start
                    duration = {1}
                    delay = {1}
                    start={{
                        transform: "translateX(-1000px)"
                    }}
                    end={{ transform: "translateX(0px)" }}
                >
                <p className="history-metrics">{totalSales.counts}</p>
                </Animate>
                <p>Epic Store</p>
                <Animate
                    play={epicSales.counts>0} // Toggle when animation should start
                    duration = {1}
                    delay = {1.5}
                    start={{
                        transform: "translateX(-1000px)"
                    }}
                    end={{ transform: "translateX(0px)" }}
                    >
                <p className="history-metrics">{epicSales.counts}</p>
                </Animate>
                <p>GOG</p>
                <Animate
                    play={gogSales.counts>0} // Toggle when animation should start
                    duration = {1}
                    delay = {2}
                    start={{
                        transform: "translateX(-1000px)"
                    }}
                    end={{ transform: "translateX(0px)" }}
                    >
                <p className="history-metrics">{gogSales.counts}</p>
                </Animate>
                <p>Origin</p>
                <Animate
                    play={originSales.counts>0} // Toggle when animation should start
                    duration = {1}
                    delay = {2.5}
                    start={{
                        transform: "translateX(-1000px)"
                    }}
                    end={{ transform: "translateX(0px)" }}
                    >
                <p className="history-metrics">{originSales.counts}</p>
                </Animate>

            </div>
        )
    }
}

export default withRouter(Stats)