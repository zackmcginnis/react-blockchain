import React, { Component } from 'react'
import logo from './logo.svg';
import './style.css';

class Home extends Component {
  render() {
    return(
      <main className="container Home">
        <div className="pure-g">
          <div className="pure-u-1-1 top">
            <h2>Block Explorer</h2>
            <p>Explore the most recent Ethereum blockchain transactions contained in blocks updated in real-time</p>
          </div>
        </div>
      </main>
    )
  }
}

export default Home
