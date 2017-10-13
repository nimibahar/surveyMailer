const sendgrid = require('sendgrid');

const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();
    this.sgApi = sendgrid(keys.sendGridKey);

    this.from_email = new helper.Email('no-reply@surveymailer.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);

    //register the content body with sendgrid's addContent hook
    this.addContent(this.body);
    //enable clickTracking by sendgrid
    this.addClickTracking();
    this.addRecipients();
  }

  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email); //transform every email string into a sendgrid email thing
    });
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings(); //constructor object for config tracking
    const clickTracking = new helper.ClickTracking(true, true); // constructor object for ClickTracking rules
    trackingSettings.setClickTracking(clickTracking); // initialise clickTracking in the trackingSettings config object

    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });

    this.addPersonalization(personalize);
  }

  async send() {
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    });

    const response = await this.sgApi.API(request);
    return respone;
  }
}

module.exports = Mailer;
