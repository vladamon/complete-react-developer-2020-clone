// since we connected our app with backend data, we don't need this anymore
// import SHOP_DATA from './shop.data';

import ShopActionsTypes from './shop.types';
import ShopActionTypes from './shop.types';

const INITIAL_STATE = {
  // that's why wee don't need to set initial data to some fixed data
  // but rather set it to null - which causes some problems if we don't adapt
  // collections: SHOP_DATA
  collections: null,
  isFetching: false,
  errorMessage: undefined
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopActionTypes.FETCH_COLLECTIONS_START:
      return {
        ...state,
        isFetching: true
      }
    case ShopActionTypes.FETCH_COLLECTIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        collections: action.payload
      }
    case ShopActionTypes.FETCH_COLLECTIONS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload
      }
    case ShopActionTypes.UPDATE_COLLECTIONS:
      return {
        ...state,
        collections: action.payload
      }
    default:
      return state;
  }
}

export default shopReducer;