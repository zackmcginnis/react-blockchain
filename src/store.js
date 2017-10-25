import { BrowserRouter, Switch, Route, Redirect, Link } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import reducer from './reducer'

// Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//const routingMiddleware = routerMiddleware(browserHistory)

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(
      thunkMiddleware//,
      //routingMiddleware
    )
  )
)

export default store
