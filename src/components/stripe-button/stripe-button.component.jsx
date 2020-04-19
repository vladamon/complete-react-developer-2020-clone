import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 1000;
  const publishableKey = 'pk_test_Rg4PAiweW7yGKV7RWMdyR4vQ00KZH0BBgM';

  const onToken = (token) => {
    console.log(token);
    alert('Payment successful');
  }

  return (
    <StripeCheckout
      label='Pay Now'
      name='CRWN Clothing Ltd'
      billingAddress
      shippingAddress
      image='https://svgsahre.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    >
    </StripeCheckout>
  )
}

export default StripeCheckoutButton;
