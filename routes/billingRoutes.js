const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.post('/api/stripe', requireLogin, (req, res) => {
    stripe.charges
      .create({
        amount: 500,
        currency: 'usd',
        description: '$5 for 5 email credits',
        source: req.body.id
      })
      .then(charge => charge);

    req.user.credits += 5;
    req.user.save().then(user => res.send(user));
  });
};

// module.exports = app => {
//   //this is the data we're sending to stripe to actually process our payment
//   app.post('/api/stripe', requireLogin, async (req, res) => {
//     const charge = await stripe.charges.create({
//       amount: 500,
//       currency: 'usd',
//       description: '$5 for 5 email credits',
//       source: req.body.id
//     });

//once stripe processed the payment, we can form our response
//we want to incerement the user's credit by 5 or to update:
// req.user.credits += 5;
//we want to save a fresh copy of this user model instance
// const user = await req.user.save();
//send the newly save user as a response
//     res.send(user);
//   });
// };
