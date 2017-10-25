import React, { Component } from 'react'
import logo from './logo.svg';
import './style.css';

class Home extends Component {
  render() {
    return(
      <main className="container Home">
        <div className="pure-g">
          <div className="pure-u-1-1 top">
            <h1>BlockBet</h1>
            <h2>Smart Contract Betting</h2>
            <p>Register, log in, get an Ethereum account/address, create a smart contract (wager), browse for other similar contracts</p>
            <h2>Block Explorer</h2>
            <p>Explore the most recent Ethereum blockchain transactions contained in blocks updated in real-time</p>
          </div>
        </div>
      </main>
    )
  }
}

export default Home
