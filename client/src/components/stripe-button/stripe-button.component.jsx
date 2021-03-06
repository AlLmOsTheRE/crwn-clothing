import axios from 'axios';
import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_zZjI69E4Xx0UlDO6HgLp7dYQ00OHgRSO1Z';

  const onToken = token => {
    axios.post('/payment', { amount: priceForStripe, token }).then(res => {
      alert('Payment was successful!');
    }).catch(error => {
      console.log('Payment error: ', JSON.parse(error));
      alert(
        'There was an issue with your payment. Please make sure you use the provided test credit card.'
      );
    });
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
