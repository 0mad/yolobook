const crypto = require('crypto');

export const hash = (password: string) => {
  return crypto
    .createHmac('sha256', process.env.SECRET_KEY)
    .update(password)
    .digest('hex');
};
