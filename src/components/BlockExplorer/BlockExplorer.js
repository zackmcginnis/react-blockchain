import React, { Component } from 'react';
import logo from './logo.svg';
import './style.css';
import Block from '../Block/Block.js';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import Web3 from 'web3';
import _ from 'lodash';
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

// Main Ethereum Network
// https://mainnet.infura.io/NNpntMduRgVobEEAEUJX
//
// Test Ethereum Network (Ropsten)
// https://ropsten.infura.io/NNpntMduRgVobEEAEUJX
//
// Test Ethereum Network (Rinkeby)
// https://rinkeby.infura.io/NNpntMduRgVobEEAEUJX
//
// Test Ethereum Network (Kovan)
// https://kovan.infura.io/NNpntMduRgVobEEAEUJX
//
// Test Ethereum Network (INFURAnet)
// https://infuranet.infura.io/NNpntMduRgVobEEAEUJX
//
// IPFS Gateway
// https://ipfs.infura.io
//
// IPFS RPC
// https://ipfs.infura.io:5001

//create web3 subscription for new ethereum block headers
const subscription = web3.eth.subscribe('newBlockHeaders', (error, result) => {
    if (!error)
        console.log(error);
})

class BlockExplorer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      block_ids: [],
      block_hashes: [],
      curr_block: null
    }
  }

  componentWillMount() {

    subscription.on("data", function(blockHeader){
      console.log("blockheader", blockHeader)
    });
    console.log("web3 from block explorer", web3.eth.blockNumber)

    // filter.watch((error, result) => {
    //   const block = web3.eth.getBlock(result, true);
    //   this.setState({
    //     curr_block: block.number
    //   });
    //   this.getBlocks(block.number);
    // });
  }

  // unsubscribes the subscription
  unsubscribe(){
    subscription.unsubscribe(function(error, success){
        if(success)
            console.log('Successfully unsubscribed!');
    });
  }

  getBlocks(curr_block_no) {
    const block_ids = [];//this.state.block_ids.slice();
    const block_hashes = [];//this.state.block_hashes.slice();
    let max_blocks = 10;
    //if (curr_block_no < max_blocks) max_blocks = curr_block_no;
    for (let i = 0; i < max_blocks; i++, curr_block_no--) {
      if(curr_block_no) {
        let currBlockObj = web3.eth.getBlock(curr_block_no);
        block_ids.push(currBlockObj.number);
        block_hashes.push(currBlockObj.hash);
      }
    }
    this.setState({
      block_ids: block_ids,
      block_hashes: block_hashes
    })
  }

  render() {

    console.log("render", this.state.curr_block)

    let tableRows = [];
    console.log("this state block ids count", this.state.block_ids.length, this.state.block_ids)
    //console.log("this.state.block_ids", this.state.block_ids)
    let ids = [...new Set(this.state.block_ids)];
    _.each(ids, (value, index) => {
      tableRows.push(
        <tr key={this.state.block_hashes[index]}>
          <td className="tdCenter">{this.state.block_ids[index]}</td>
          <td><Link to={`/explorer/${this.state.block_hashes[index]}`}>{this.state.block_hashes[index]}</Link></td>
        </tr>
      )
    });
    console.log("tablerows count", tableRows.length)

    if(this.state.block_ids.length > 0) {
      return (
        <div className="BlockExplorer">
          <div className="app-header">
            <div className="logo-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Block Explorer</h2>
            </div>
            <div>
              Current Block: {this.state.curr_block}
              <table className="block-table">
                <thead><tr>
                  <th>Block No</th>
                  <th>Hash</th>
                </tr></thead>
                <tbody>
                  {tableRows}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="BlockExplorer">
          <div className="app-header">
            <div className="logo-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Block Explorer</h2>
            </div>
              <div className="loader" >
                  <svg width="48" height="48" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <path d="M 150,0 a 150,150 0 0,1 106.066,256.066 l -35.355,-35.355 a -100,-100 0 0,0 -70.711,-170.711 z" fill="#76f19a">
                      <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 150 150" to="360 150 150" begin="0s" dur=".5s" fill="freeze" repeatCount="indefinite"></animateTransform>
                    </path>
                  </svg>
              <h3>Retrieving latest block headers...</h3>
              </div>
          </div>
        </div>
      );
    }
  }
}
export default BlockExplorer;
