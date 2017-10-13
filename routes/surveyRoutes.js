const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const mongoose = require('mongoose');
const Survey = mongoose.model('surveys');

module.exports = app => {
  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thank you for voting!');
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    //a config object to pass to the Mailer constructor
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));
    //sending the email with sendgrid send() hook
    // try {
    //   await mailer.send(); //send the mail
    //   await survey.save(); //save the survey
    //   req.user.credits -= 1;
    //   const user = req.user.save();
    //   res.send(user);
    // } catch (err) {
    //   res.send(422).send(err);
    // }
    try {
      await mailer.send(); //send the mail
    } catch (err) {
      res.status(422).send(err);
    }

    try {
      await survey.save(); //save the survey
    } catch (err) {
      res.send(422).send(err);
    }

    try {
      req.user.credits -= 1;
    } catch (err) {
      res.send(422).send(err);
    }

    try {
      const user = req.user.save();
    } catch (err) {
      res.send(422).send(err);
    }

    try {
      res.send(user);
    } catch (err) {
      res.send(422).send(err);
    }
  });
};
