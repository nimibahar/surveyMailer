const keys = require('../../config/keys');

module.exports = survey => {
  return `
    <html>
      <body>
        <div style="text-align: centerl;">
          <h3>I'd like to get your input!</h3>
          <p>Please answe the foolowing question:</p>
          <p>${survey.body}</p>
        </div>
        <div>
          <a href=${keys.redirectDomain}/api/surveys/thanks>Yes</a>
        </div>
        <div>
          <a href=${keys.redirectDomain}/api/surveys/thanks>No</a>
        </div>
      </body>
    </html>
  `;
};
