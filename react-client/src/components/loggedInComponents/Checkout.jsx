import React from 'react'
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
//
// // import STRIPE_PUBLISHABLE from './constants/stripe';
// // import PAYMENT_SERVER_URL from './constants/server';
//
// const CURRENCY = 'USD';
//
//
// const successPayment = data => {
//   alert('Payment Successful');
// };
//
// const errorPayment = data => {
//   alert('Payment Error', data);
// };
//
// const onToken = (amount, email) => {
//   console.log(email)
//   return (token, amount, email) => {
//     console.log(token, email);
//     axios.post('/passes/pending/buy',
//       {
//         description: 'card',
//         source: token.id,
//         currency: CURRENCY,
//         amount: 1000,
//         email: wetf
//       })
//       .then(successPayment)
//       .catch(errorPayment);
//   }
// };
// // const Checkout = (props) => (
// //   <StripeCheckout
// //     description={props.description}
// //     amount={props.current_price}
// //     token={onToken(props.current_price, props.email)}
// //     currency={CURRENCY}
// //     stripeKey="pk_test_6EnH0U0AtzWmpg4xNaEtIlLa"
// //   />
// // )

class Checkout extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currency: 'USD',
      pass: this.props.stuff
    }
  }


  successPayment(data) {
    alert('Payment Successful');
  };

  errorPayment(data) {
    alert('Payment Error', data);
  };

  onToken(token) {
    console.log(this.state)
    axios.post('/passes/pending/buy',
    {
      description: 'card',
      source: token.id,
      currency: 'USD',
      amount: amount || 'fail email',
      email: email || 'fail email'
    })
    .then(successPayment)
    .catch(errorPayment);
  }

  render(){
    return(
      <StripeCheckout
        description={this.props.description}
        amount={this.props.current_price}
        token={this.onToken.bind(this)}
        currency={this.state.currency}
        stripeKey="pk_test_6EnH0U0AtzWmpg4xNaEtIlLa"
      />
    )
  }
}

export default Checkout;
