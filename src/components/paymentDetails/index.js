import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import useUserStore from '../../zustand/userStore';
import useCartStore from '../../zustand/cartStore';
import useOrderStore from '../../zustand/orderStore';
import { apiInstance } from '../../utils';
import FormInput from '../forms/formInput';
import Button from '../forms/button';
import './styles.scss';

const initialAddressState = {
  line1: 'test',
  line2: 'test',
  city: 'test',
  state: 'test',
  postal_code: 'test',
  country: 'KR',
};

const PaymentDetails = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [billingAddress, setBillingAddress] = useState(initialAddressState);
  const [shippingAddress, setShippingAddress] = useState(initialAddressState);
  const [recipientName, setRecipientName] = useState('test');
  const [nameOnCard, setNameOnCard] = useState('test');
  const { currentUser } = useUserStore();
  const { cartItems, clearCart } = useCartStore();
  const cartTotalPrice = useCartStore((state) =>
    state.selectCartTotalPrice(state)
  );
  const cartItemsCount = useCartStore((state) =>
    state.selectCartItemsCount(state)
  );
  const { saveOrder, isSavingOrder } = useOrderStore();

  useEffect(() => {
    if (cartItemsCount < 1) {
      navigate('/dashboard');
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

    try {
      const { data: clientSecret } = await apiInstance.post(
        '/payments/create',
        {
          amount: cartTotalPrice * 100,
          shipping: {
            name: recipientName,
            address: {
              ...shippingAddress,
            },
          },
        }
      );

      const { paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: CardElement,
        billing_details: {
          name: nameOnCard,
          address: {
            ...billingAddress,
          },
        },
      });

      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      console.log(paymentIntent);
      const configOrder = {
        orderTotal: cartTotalPrice,
        orderItems: cartItems.map((item) => {
          const { documentID, thumbnail, name, price, quantity } = item;
          return {
            documentID,
            thumbnail,
            name,
            price,
            quantity,
          };
        }),
      };

      await saveOrder(configOrder, currentUser.currentUser.id);
      clearCart();
    } catch (error) {
      console.error('Error processing order: ', error);
    }
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

        <Button type='submit' disabled={isSavingOrder}>
          {isSavingOrder ? 'Processing Order...' : 'Pay Now'}
        </Button>
      </form>
    </div>
  );
};

export default PaymentDetails;
