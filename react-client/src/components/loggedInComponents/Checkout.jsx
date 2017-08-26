// import React from 'react'
// import StripeCheckout from 'react-stripe-checkout';
//
// export default class Checkout extends React.Component {
//   onToken(token) {
//     console.log(JSON.stringify(token), 'werwerewerwrew')
//     fetch('/passes/pending/buy', {
//       method: 'POST',
//       body: JSON.stringify(token),
//     }).then(err, response => {
//       response.json().then(data => {
//         alert(`We are in business, ${data.email}`);
//       });
//     });
//   }
//
//   // ...
//
//   render() {
//     return (
//       // ...
//       <StripeCheckout
//   name="Three Comma Co."
//   description="Big Data Stuff"
//   image="https://www.vidhub.co/assets/logos/vidhub-icon-2e5c629f64ced5598a56387d4e3d0c7c.png"
//   ComponentClass="div"
//   panelLabel="Give Money"
//   amount={1000000}
//   currency="USD"
//   token={this.onToken}
//   stripeKey="pk_test_6EnH0U0AtzWmpg4xNaEtIlLa"
//   email="info@vidhub.co"
//   >
//   <button className="btn btn-primary">
//     Purchase Pass
//   </button>
// </StripeCheckout>
//     )
//   }
// }

import React from 'react'
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

// import STRIPE_PUBLISHABLE from './constants/stripe';
// import PAYMENT_SERVER_URL from './constants/server';

const CURRENCY = 'USD';

const successPayment = data => {
  alert('Payment Successful');
};

const errorPayment = data => {
  alert('Payment Error', data);
};

const onToken = (amount, description) => token =>
  axios.post('/passes/pending/buy',
    {
      description: 'card',
      source: token.id,
      currency: CURRENCY,
      amount: amount
    })
    .then(successPayment)
    .catch(errorPayment);

const Checkout = ({ name, description, amount }) =>
  <StripeCheckout
    name={name}
    description={description}
    amount={amount}
    token={onToken(amount, description)}
    currency={CURRENCY}
    stripeKey="pk_test_6EnH0U0AtzWmpg4xNaEtIlLa"
  />

export default Checkout;
