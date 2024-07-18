import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import FormInput from '../forms/formInput';
import Button from '../forms/button';
import { apiInstance } from '../../utils';
import useCartStore from '../../zustand/cartStore';
import './styles.scss';
import { useNavigate } from 'react-router-dom';

const initialAddressState = {
  line1: '',
  line2: '',
  city: '',
  state: '',
  postal_code: '',
  country: 'KR',
};

const PaymentDetails = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [billingAddress, setBillingAddress] = useState(initialAddressState);
  const [shippingAddress, setShippingAddress] = useState(initialAddressState);
  const [recipientName, setRecipientName] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const cartTotalPrice = useCartStore((state) =>
    state.selectCartTotalPrice(state)
  );
  const cartItemsCount = useCartStore((state) =>
    state.selectCartItemsCount(state)
  );
  const { clearCart } = useCartStore();

  useEffect(() => {
    if (cartItemsCount < 1) {
      navigate('/');
    }
  }, [navigate, cartItemsCount]);

  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleBilling = (e) => {
    const { name, value } = e.target;
    setBillingAddress((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const CardElement = elements.getElement('card');

    if (
      !shippingAddress.line1 ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.postal_code ||
      !billingAddress.line1 ||
      !billingAddress.city ||
      !billingAddress.state ||
      !billingAddress.postal_code ||
      !recipientName ||
      !nameOnCard
    ) {
      return;
    }

    apiInstance
      .post('/payments/create', {
        amount: cartTotalPrice * 100,
        shipping: {
          name: recipientName,
          address: {
            ...shippingAddress,
          },
        },
      })
      .then(({ data: clientSecret }) => {
        stripe
          .createPaymentMethod({
            type: 'card',
            card: CardElement,
            billing_details: {
              name: nameOnCard,
              address: {
                ...billingAddress,
              },
            },
          })
          .then(({ paymentMethod }) => {
            stripe
              .confirmCardPayment(clientSecret, {
                payment_method: paymentMethod.id,
              })
              .then(({ paymentIntent }) => {
                clearCart();
              });
          });
      });
  };

  const configCardElement = {
    iconStyle: 'solid',
    style: {
      base: {
        fontSize: '16px',
      },
    },
    hidePostalCode: true,
  };

  return (
    <div className='paymentDetails'>
      <form onSubmit={handleFormSubmit}>
        <div className='group'>
          <h2>Shipping Address</h2>

          <FormInput
            required
            placeholder='Recipient Name'
            name='recipientName'
            value={recipientName}
            handleChange={(e) => setRecipientName(e.target.value)}
            type='text'
          />
          <FormInput
            required
            placeholder='Line 1'
            name='line1'
            value={shippingAddress.line1}
            handleChange={handleShipping}
            type='text'
          />
          <FormInput
            required
            placeholder='Line 2'
            name='line2'
            value={shippingAddress.line2}
            handleChange={handleShipping}
            type='text'
          />
          <FormInput
            required
            placeholder='City'
            name='city'
            value={shippingAddress.city}
            handleChange={handleShipping}
            type='text'
          />
          <FormInput
            required
            placeholder='State'
            name='state'
            value={shippingAddress.state}
            handleChange={handleShipping}
            type='text'
          />
          <FormInput
            required
            placeholder='Postal Code'
            name='postal_code'
            value={shippingAddress.postal_code}
            handleChange={handleShipping}
            type='text'
          />
        </div>

        <div className='group'>
          <h2>Billing Address</h2>

          <FormInput
            required
            placeholder='Name On Card'
            name='nameOnCard'
            value={nameOnCard}
            handleChange={(e) => setNameOnCard(e.target.value)}
            type='text'
          />
          <FormInput
            required
            placeholder='Line 1'
            name='line1'
            value={billingAddress.line1}
            handleChange={handleBilling}
            type='text'
          />
          <FormInput
            required
            placeholder='Line 2'
            name='line2'
            value={billingAddress.line2}
            handleChange={handleBilling}
            type='text'
          />
          <FormInput
            required
            placeholder='City'
            name='city'
            value={billingAddress.city}
            handleChange={handleBilling}
            type='text'
          />
          <FormInput
            required
            placeholder='State'
            name='state'
            value={billingAddress.state}
            handleChange={handleBilling}
            type='text'
          />
          <FormInput
            required
            placeholder='Postal Code'
            name='postal_code'
            value={billingAddress.postal_code}
            handleChange={handleBilling}
            type='text'
          />
        </div>

        <div className='group'>
          <h2>Card Details</h2>

          <CardElement options={configCardElement} />
        </div>

        <Button type='submit'>Pay Now</Button>
      </form>
    </div>
  );
};

export default PaymentDetails;
