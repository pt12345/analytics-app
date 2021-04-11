import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import './Start.css'

class Start extends Component {

    render() {
        
        return(
           <Link id="start-link" to="/main"><h2 id="start-text">See Data</h2></Link>
        )
    }
}

export default withRouter(Start)