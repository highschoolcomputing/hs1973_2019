import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers/rootReducer';
import { apiMiddleware } from '../middleware/apiMiddleware';

export default function configureStore() {
  /* const persistedUser = localStorage.getItem('reduxUserState')
    ? JSON.parse(localStorage.getItem('reduxUserState'))
    : null;

  const persistedState = persistedUser ? { users: persistedUser } : {}; */

  const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;

  const enhancer = composeEnhancers(
    applyMiddleware(apiMiddleware)
  );

  const store = createStore(rootReducer, /* persistedState, */ enhancer);

  return store;
}
