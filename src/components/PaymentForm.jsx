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

    const [cost, setCost] = React.useState(8.00);

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
        <>
        <div className = "m-4">
        <h1 className = "text-4xl font-bold text-gradient bg-gradient-to-r py-4 from-purple-300 to-blue-300 text-transparent bg-clip-text">Payment</h1>
        
        <div className = "flex flex-col sm:flex-row justify-between gap-4">
        <div className = "bg-white p-2 rounded-md my-2 sm:w-1/3">
            <h1 className = "text-2xl font-light">Order Summary</h1>
            <br></br>
            <div className = "flex justify-between my-2">
            <p className = "text-sm font-light">Pro Tier - 1 Month Subscription</p>
            <p className = "text-sm font-light">$8.00</p>
            </div>
            <div className = "flex justify-between my-2">
            <p className = "text-sm font-light">Subtotal</p>
            <p className = "text-sm font-light">$8.00</p>
            </div>
            <div className = "flex justify-between my-2">
            <p className = "text-sm font-light">Tax</p>
            <p className = "text-sm font-light">$0.00</p>
            </div>
            <div className = "flex justify-between my-2">
            <p className = "text-sm font-light">Discount</p>
            <p className = "text-sm font-light">$0.00</p>
            </div>
            <div className = "flex justify-between my-2">
            <p className = "text-sm font-light">Shipping</p>
            <p className = "text-md font-light">$0.00</p>
            </div>
            <hr></hr>
            <br></br>
            <div className = "flex justify-between">
            <p className = "text-sm font-light">Total</p>
            <p className = "text-sm font-semibold">$8.00</p>
            </div>

        <form className = "bg-white flex flex-col rounded-md w-full mt-12" onSubmit={handleSubmit}>
            <div className = "bg-slate-200 rounded-md p-2">
            <CardElement options={CARD_OPTIONS} />
            </div>
            <button className = "bg-slate-700 p-2 rounded-md my-2 text-white hover:bg-slate-600 active:bg-slate-700" type="submit" disabled={!stripe}>
                Pay ${parseFloat(cost).toFixed(2)}
            </button>
        </form>
        </div>
        <div className = "bg-white p-2 rounded-md my-2 sm:w-2/3">
            <h1 className = "text-2xl font-light">Selected Plan</h1>
        </div>
        </div>


        
                </div>

        </>

    );
};

export default PaymentForm;
