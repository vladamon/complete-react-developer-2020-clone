import React from 'react';

import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { selectCartItems } from '../../redux/cart/cart.selector'
import { toggleCartHidden } from '../../redux/cart/cart.actions'

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';

import './cart-dropdown.styles.scss';

const CartDropdown = ({ cartItems, history, dispatch }) => {
  return (
    <div className='cart-dropdown'>
      <div className='cart-items'>
       { cartItems.length ? (
            cartItems.map(item => (
              <CartItem item={item}></CartItem>))
       ) : (
         <span className='empty-message'>Your cart is empty</span>
       )}
      </div>
      <CustomButton onClick={() => {
        history.push('/checkout');
        dispatch(toggleCartHidden())
      }}>Go to checkout</CustomButton>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
});

// const mapStateToProps = state => ({
//   cartItems: selectCartItems(state)
// });

export default withRouter(connect(mapStateToProps)(CartDropdown));
