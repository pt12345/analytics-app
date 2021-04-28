import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router';
import ApiContext from './ApiContext';
import Main from './Main/Main';
import Start from './Start/Start';
import './App.css'
import { Link } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      epicCount: 0,
      originCount: 0,
      gogCount: 0,
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
      return Promise.all([responseCounts.json(), responseSales.json()])
    })
    .then(([counts, sales]) => {

      //this.setState({ sales: sales.data.list})

      let currentGreaterThan = this.greaterThanNintey(sales.data.list);
      let currentTotalDollars = this.totalDollarSavings(sales.data.list);
      let currentTotalSales = this.totalSales(sales.data.list);

      for(let i=0;i<counts.length;i++) {
        // Greater than 90
        if(counts[i].name === "greater" ) {
          counts[i].counts += currentGreaterThan;
        }
        // Total sales dollars
        if(counts[i].name === "totalDollars" ) {
          counts[i].dollars += currentTotalDollars;
        }
        // Total sales count
        if(counts[i].name === "total" ) {
          counts[i].counts += currentTotalSales.all;
        }
        // Epic sales
        if(counts[i].name === "epic" ) {
          counts[i].counts += currentTotalSales.epic;
        }
        // Gog sales
        if(counts[i].name === "gog" ) {
          counts[i].counts += currentTotalSales.gog;
        }
        // Origin sales
        if(counts[i].name === "origin" ) {
          counts[i].counts += currentTotalSales.origin;
        }
      }

      let newRandomSale = this.getRandom(sales.data.list);

      this.setState({ 
        history: counts,
        sales: sales.data.list,
        randomSale: newRandomSale
      });
      
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

    let max = {
      "title": "Searching...",
      "price_old": 0,
      "price_new": 0,
      "prics_cut": 0,
      "shop": {
        "name": "..."
      }
    };

    for(let i=0;i<this.state.sales.length;i++) {
      if((this.state.sales[i].price_old - this.state.sales[i].price_new) > (max.price_old - max.price_new))
        max = this.state.sales[i];
    }

    return max;
  }

  getRandom = (sales) => {
    
    let randomSale = sales[Math.floor(Math.random() * sales.length)]
 
    return randomSale;
  }

  setRandom = (sales) => {
    
    let randomSale = this.state.sales[Math.floor(Math.random() * this.state.sales.length)]
 
    this.setState({ randomSale });
  }

  greaterThanNintey = (sales) => {
    let count = 0;

    //TODO: Get from DB
    for(let i=0;i<sales.length;i++) {
      if(sales[i].price_cut > 90)
        count++;
    }

    return count;
  }

  totalDollarSavings = (sales) => {
    let total = 0;

    //TODO: Get from DB
    for(let i=0;i<sales.length;i++) {
      total += (sales[i].price_old - sales[i].price_new)
    }

    return total;
  }

  totalSales = (sales) => {
     let totalSales = {
      all: sales.length,
      origin: 0,
      gog: 0,
      epic:0
    }
    //TODO: Get from DB
   
    totalSales.origin = sales.filter(sale => sale.shop.name === "Origin").length;
    totalSales.epic = sales.filter(sale => sale.shop.name === "Epic Game Store").length;
    totalSales.gog = sales.filter(sale => sale.shop.name === "GOG").length;

    this.setState({ 
      originCount: totalSales.origin,
      epicCount: totalSales.epic,
      gogCount: totalSales.gog
    });
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
    let newGreaterThanCount, newTotalDollarAmount, newTotalSalesCount, newTotalEpicCount, newTotalGogCount, newTotalOriginCount = 0;
    for(let i=0;i<this.state.history.length;i++) {
      // Greater than 90
      if(this.state.history[i].name === "greater" )
        newGreaterThanCount = this.state.history[i]
      // Total sales dollars
      if(this.state.history[i].name === "totalDollars" )
        newTotalDollarAmount= this.state.history[i]
      // Total sales count
      if(this.state.history[i].name === "total" )
        newTotalSalesCount = this.state.history[i]
      // Epic sales
      if(this.state.history[i].name === "epic" )
      newTotalEpicCount = this.state.history[i]
      // Gog sales
      if(this.state.history[i].name === "gog" )
        newTotalGogCount = this.state.history[i]
      // Origin sales
      if(this.state.history[i].name === "origin" )
        newTotalOriginCount = this.state.history[i]
    }
    const value = {
      sales: this.state.sales,
      originCount: this.state.originCount,
      epicCount: this.state.epicCount,
      gogCount: this.state.gogCount,
      randomSale: this.state.randomSale,
      greaterThanCount: newGreaterThanCount,
      totalSalesCount: newTotalSalesCount,
      totalEpicCount: newTotalEpicCount,
      totalGogCount: newTotalGogCount,
      totalOriginCount: newTotalOriginCount,
      totalDollarAmount: newTotalDollarAmount,
      findMaxPercent: this.findMaxPercent,
      findMaxDollars: this.findMaxDollars,
      getRandom: this.getRandom,
      greaterThanNintey: this.greaterThanNintey,
      totalDollarSavings: this.totalDollarSavings,
      totalSales: this.totalSales,
      setRandom: this.setRandom
    }
      
    return(
      <ApiContext.Provider value={value}>
        <Fragment>
          <header><Link id="start-link" to="/"><h1 id="title">Game Sale Analytics</h1></Link></header>
          {this.renderMain()}
          <footer><p id="footer-text">Powered by IsThereAnyDeal.com</p></footer>
        </Fragment>
      </ApiContext.Provider>
    )
}
}

export default App;