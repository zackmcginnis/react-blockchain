import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect, Link } from 'react-router-dom'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { UserIsAuthenticated, UserIsNotAuthenticated } from './util/wrappers.js'
import getWeb3 from './util/web3/getWeb3'
import registerServiceWorker from './registerServiceWorker';

// Layouts
import App from './App'
import Home from './components/Home/Home'
import Dashboard from './components/Dashboard/Dashboard'
import SignUp from './components/Signup/SignUp'
import Profile from './components/Profile/Profile'
import BlockExplorer from './components/BlockExplorer/BlockExplorer';
import Block from './components/Block/Block';

// Redux Store
import store from './store'

// Initialize react-router-redux.
//const history = syncHistoryWithStore(browserHistory, store)

// Initialize web3 and set in Redux.
getWeb3
.then(results => {
  console.log('Web3 initialized!')
})
.catch(() => {
  console.log('Error in web3 initialization.')
})

ReactDOM.render((
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <App />
          <main>
            <Switch>
              <Route path="/dashboard" component={UserIsAuthenticated(Dashboard)} />
              <Route path="/signup" component={UserIsNotAuthenticated(SignUp)} />
              <Route path="/profile" component={UserIsAuthenticated(Profile)} />
              <Route path="/explorer" exact component={BlockExplorer} />
              <Route path={`/explorer/:blockHash`} component={Block} />
              <Redirect to="/explorer" />
            </Switch>
          </main>
        </div>
      </BrowserRouter>
    </Provider>
  ),
  document.getElementById('root')
)
registerServiceWorker();
