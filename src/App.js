import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router';
import ApiContext from './ApiContext';
import Main from './Main/Main';
import Start from './Start/Start';
import './App.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sales: [
        {
          "title": "Searching...",
          "price_old": 0,
          "price_new": 0,
          "prics_cut": 0,
          "shop": {
            "name": "..."
          }
      
        }
      ],
      randomSale: {
        "title": "Searching...",
        "price_old": 0,
        "price_new": 0,
        "prics_cut": 0,
        "shop": {
          "name": "..."
        }
      },
      history: [
        {
        "name": "Searching...",
        "counts": 0,
        "dollars": 0
      },
      {
        "name": "Searching...",
        "counts": 0,
        "dollars": 0
      },
      {
        "name": "Searching...",
        "counts": 0,
        "dollars": 0
      },
      {
        "name": "Searching...",
        "counts": 0,
        "dollars": 0
      },
      {
        "name": "Searching...",
        "counts": 0,
        "dollars": 0
      },
      {
        "name": "Searching...",
        "counts": 0,
        "dollars": 0
      },
      {
        "name": "Searching...",
        "counts": 0,
        "dollars": 0
      },
      {
        "name": "Searching...",
        "counts": 0,
        "dollars": 0
      },
      {
        "name": "Searching...",
        "counts": 0,
        "dollars": 0
      },
      {
        "name": "Searching...",
        "counts": 0,
        "dollars": 0
      }
    ]
    }
  }


  componentDidMount() {
    
    Promise.all([
      fetch('https://sheltered-chamber-91871.herokuapp.com/api/counts/'),
      fetch(`https://api.isthereanydeal.com/v01/deals/list/?key=${process.env.REACT_APP_API_KEY}&offset=0&region=us&country=US&shops=origin,gog,epic&limit=1000`)
    ])
    .then(([responseCounts, responseSales]) => {
      console.log("process.env: ");
      console.log(process.env);
      return Promise.all([responseCounts.json(), responseSales.json()])
    })
    .then(([counts, sales]) => {

      this.setState({ sales: sales.data.list})

      let currentGreaterThan = this.greaterThanNintey();
      let currentTotalDollars = this.totalDollarSavings();
      let currentTotalSales = this.totalSales();

      // Greater than 90
      counts[0].counts += currentGreaterThan;
      // Total sales dollars
      counts[5].dollars += currentTotalDollars;
      console.log(Number(counts[5].dollars))
      // Total sales count
      counts[1].counts += currentTotalSales.all;
      // Epic sales
      counts[2].counts += currentTotalSales.epic;
      // Gog sales
      counts[3].counts += currentTotalSales.gog;
      // Origin sales
      counts[4].counts += currentTotalSales.origin;

      this.setState({ history: counts})
      this.getRandom();
    })
    .then(() => {
      for(let i=0;i<this.state.history.length;i++) {

        fetch(`https://sheltered-chamber-91871.herokuapp.com/api/counts/${this.state.history[i].name}`, {
          method: 'PATCH',
          body: JSON.stringify({
          "counts": this.state.history[i].counts,
          "dollars": this.state.history[i].dollars
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
      }
    })
  


  }

  findMaxPercent = () => {

    let max = this.state.sales[0];

    for(let i=1;i<this.state.sales.length;i++) {
      if(this.state.sales[i].price_cut > max.price_cut)
        max = this.state.sales[i];
    }

    return max;
  }

  findMaxDollars = () => {

    let max = this.state.sales[0];

    for(let i=1;i<this.state.sales.length;i++) {
      if((this.state.sales[i].price_old - this.state.sales[i].price_new) > (max.price_old - max.price_new))
        max = this.state.sales[i];
    }

    return max;
  }

  getRandom = () => {
    
    let randomSale = this.state.sales[Math.floor(Math.random() * this.state.sales.length)]
    this.setState({randomSale: randomSale})
  }

  greaterThanNintey = () => {
    let count = 0;

    //TODO: Get from DB
    for(let i=0;i<this.state.sales.length;i++) {
      if(this.state.sales[i].price_cut > 90)
        count++;
    }

    return count;
  }

  totalDollarSavings = () => {
    let total = 0;

    //TODO: Get from DB
    for(let i=0;i<this.state.sales.length;i++) {
      total += (this.state.sales[i].price_old - this.state.sales[i].price_new)
    }

    return total;
  }

  totalSales = () => {
     let totalSales = {
      all: this.state.sales.length,
      origin: 0,
      gog: 0,
      epic:0
    }
    //TODO: Get from DB
   
    totalSales.origin = this.state.sales.filter(sale => sale.shop.name === "Origin").length;
    totalSales.epic = this.state.sales.filter(sale => sale.shop.name === "Epic Game Store").length;
    totalSales.gog = this.state.sales.filter(sale => sale.shop.name === "GOG").length;
    return totalSales;
  }

  renderMain = () => {
    return (
      <Switch>
        <Route exact path='/'
        render= {() =>
          <Start/>}/>
        
        <Route exact path='/main'
        render= {() =>
          <Main/>}/>

      </Switch>
    )
  }

  render() {
    const value = {
      sales: this.state.sales,
      randomSale: this.state.randomSale,
      greaterThanCount: this.state.history[0],
      totalSalesCount: this.state.history[1],
      totalEpicCount: this.state.history[2],
      totalGogCount: this.state.history[3],
      totalOriginCount: this.state.history[4],
      totalDollarAmount: this.state.history[5],
      findMaxPercent: this.findMaxPercent,
      findMaxDollars: this.findMaxDollars,
      getRandom: this.getRandom,
      greaterThanNintey: this.greaterThanNintey,
      totalDollarSavings: this.totalDollarSavings,
      totalSales: this.totalSales
    }
        
    return(
      <ApiContext.Provider value={value}>
        <Fragment>
          <header><h1 id="title">Game Analytics</h1></header>
          {this.renderMain()}
          <footer><p id="footer-text">Powered by IsThereAnyDeal.com</p></footer>
        </Fragment>
      </ApiContext.Provider>
    )
}
}

export default App;