import CryptoJS from 'crypto-js';

const SECRET_KEY = 'ArthurGustavoLucas';

export function encryptPassword(password) {
  const encryptedPassword = CryptoJS.AES.encrypt(password, SECRET_KEY).toString();
  return encryptedPassword;
}

export function decryptPassword(encryptedPassword) {
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, SECRET_KEY);
  const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedPassword;
}
