import React, { Component } from 'react';
import logo from './logo.svg';
import './style.css';
import Block from '../Block/Block.js';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import Web3 from 'web3';
import _ from 'lodash';
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
const filter = web3.eth.filter('latest');

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
    filter.watch((error, result) => {
      const block = web3.eth.getBlock(result, true);
      this.setState({
        curr_block: block.number
      });
      this.getBlocks(block.number);
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
            <div>
              Current Block: Loading...
                  <img src="../../assets/img/wavy.gif" className="loadinglogo" alt="loadinglogo" />
            </div>
          </div>
        </div>
      );
    }
  }
}
export default BlockExplorer;
