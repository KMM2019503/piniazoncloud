export const generateVerificationToken = () =>
  Math.floor(1000 + Math.random() * 800000).toString();
