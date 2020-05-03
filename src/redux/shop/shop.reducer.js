// since we connected our app with backend data, we don't need this anymore
// import SHOP_DATA from './shop.data';

import ShopActionsTypes from './shop.types';
import ShopActionTypes from './shop.types';

const INITIAL_STATE = {
  // that's why wee don't need to set initial data to some fixed data
  // but rather set it to null - which causes some problems if we don't adapt
  // collections: SHOP_DATA
  collections: null
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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