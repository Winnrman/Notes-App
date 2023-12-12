// src/components/PaymentForm.js
import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const CARD_OPTIONS = {
    style: {
        base: {
            fontSize: '16px',
            color: '#424770',
            '::placeholder': {
                color: '#aab7c4',
            },
        },
        invalid: {
            color: '#9e2146',
        },
    },
};

const PaymentForm = () => {

    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            axios.post('/api/checkout', {
                amount: 100, // cents (100 = $1)
                currency: 'usd',
                paymentMethodId: paymentMethod.id
            })
            .then(
                // go to dashboard
                navigate("/dashboard")
                )
            .catch(err => console.log(err));
        }
    };

    return (
        <div className = "m-4">
        <h1 className = "text-4xl font-bold text-gradient bg-gradient-to-r py-4 from-purple-300 to-blue-300 text-transparent bg-clip-text">Payment</h1>
        <form className = "bg-slate-300 flex flex-col rounded-md p-2 w-1/2" onSubmit={handleSubmit}>
            <div className = "ring-1 ring-slate-600 rounded-md p-2">
            <CardElement options={CARD_OPTIONS} />
            </div>
            <button className = "bg-slate-700 p-2 rounded-md my-2 text-white hover:bg-slate-600 active:bg-slate-700" type="submit" disabled={!stripe}>
                Pay
            </button>
        </form>
        </div>
    );
};

export default PaymentForm;
