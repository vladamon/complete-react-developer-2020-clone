import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

//import { fetchCollectionStart } from './shop/shop.sagas';
import rootSaga from './root-saga';

import rootReducer from './root-reducer';
//import { fetchCollectionStart } from './shop/shop.actions';


const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

// const store = createStore(rootReducer, applyMiddleware(...middlewares));

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware(...middlewares)
));

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

 export default store;