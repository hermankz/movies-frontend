import { createStore, applyMiddleware, compose, bindActionCreators } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import createHistory from 'history/createBrowserHistory';
import rootReducer from './reducers';
// import { composeWithDevTools } from 'redux-devtools-extension';

export const history = createHistory();

const initialState = {};
const enhancers = [];
const middleware = [
  thunk,
  routerMiddleware(history),
]

if (process.env.NODE_ENV === 'development') {
    middleware.push(logger);

    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__
    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension());
    }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
);

export function bindActions(actions) {
    return dispatch => ({
        actions: { ...bindActionCreators(actions, dispatch) },
    });
}

export function mapStateToProps(key) {
    return state => ({ store: state && state[key] ? state[key] : null });
}

export default store;