import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router';
import ApiContext from './ApiContext';
import Main from './Main/Main';
import Start from './Start/Start';
import STORE from './STORE'
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
      }
    }
  }


  componentDidMount() {
    
    /*fetch('')
    .then(response => {
      return response.json()
    })
    .then(responseJson => {
      console.log(responseJson)
      this.setState({ sales: responseJson.data.list})
      this.getRandom();
    })*/
    this.setState( { sales: STORE.data.list });
    setTimeout(() => {this.getRandom();}, 2000 )
    this.getRandom();
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