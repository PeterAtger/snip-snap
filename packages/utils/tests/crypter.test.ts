import { decrytpData, encryptData } from '../src/crypher';

const {
  CRYPTO_SECRET_KEY: key,
  CRYPTO_SECRET_IV: iv,
  CRYPTO_ECNRYPTION_METHOD: method,
} = process.env;

const describeCrypter = (key && iv && method ? describe : describe.skip);

describeCrypter('Crypter', () => {
  it('Encipts data then redecrypts data', () => {
    const password = 'random_pass';
    const encryptedPassword = encryptData(password);
    const decryptedPassword = decrytpData(encryptedPassword);
    expect(decryptedPassword).toBe(password);
    expect(encryptedPassword).not.toBe(password);
  });
});
