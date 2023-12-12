import {loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
// import { stripePromise } from './stripe';
import PaymentForm from '../components/PaymentForm';
import Header from '../components/Header';

export const stripePromise = loadStripe('pk_test_51OMKdMDy5bQDtXfZh191EmDtTrEhZCKXDwz69l6tVS2PU3OWrxpLsIqbIVirND0ENvMksWJjUbqi0wueWIzvnhRu00z9YSRkMN');

const Payment = () => {


    return (
        <div className = "bg-gradient-to-bl from-purple-900 to-blue-900 min-h-screen py-2 flex flex-col">
            <Header/>
            <div className = "pt-16">
            <Elements stripe={stripePromise}>
                <PaymentForm />
            </Elements>
            </div>
        </div>
    );

}

export default Payment;