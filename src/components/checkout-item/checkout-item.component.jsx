import React from 'react';

import './checkout-item.styles.scss';

import { connect} from 'react-redux';

import { clearItemFromCart, addItem, removeItem } from '../../redux/cart/cart.actions';

const CheckoutItem = ({ cartItem, clear, add, remove }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <div className='checkout-item'>
    <div className='image-container'>
      <img src={imageUrl} alt='item'></img>
    </div>
    <span className='name'>{name}</span>
    <span className='quantity'>
      <div className='arrow' onClick={() => remove(cartItem)}>&#10094;</div>
      <span className='value'>{quantity}</span>
      <div className='arrow' onClick={() => add(cartItem)}>&#10095;</div>
    </span>
    <span className='price'>{price}</span>
    <div className='remove-button' onClick={() => clear(cartItem)}>&#10005;</div>
  </div>
  )
};

const mapDispatchToProps = dispatch => ({
  clear: item => dispatch(clearItemFromCart(item)),
  add: item => dispatch(addItem(item)),
  remove: item => dispatch(removeItem(item))
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
