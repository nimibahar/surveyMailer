const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default emails => {
  const invalidEmailsArray = emails
    .split(',')
    .map(email => email.trim())
    .filter(email => re.test(email) === false);

  if (invalidEmailsArray.length) {
    return `These emails are not valid ${invalidEmailsArray}`;
  }

  return;
};
