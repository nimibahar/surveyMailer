import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class Payment extends Component {
  render() {
    return (
      <StripeCheckout name="surveyMailer" description="$5 for 5 email credits" amount={500} token={this.props.handleToken} stripeKey={process.env.REACT_APP_STRIPE_KEY}>
        <button className="btn">Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payment);
