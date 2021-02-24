## Encrypt and Decrypt your text-with password
- Provide text and encryption-password to encrypt your message/text. 
- Save your text/content in your digital-notebook.
- Whenever you need to recover your message back, just paste your encrypted-message and provide your password to decrypt message.


## System Design
- Core Nodejs module [crypto](https://nodejs.org/api/crypto.html) is used in backend to encrypt and decrypt text
- `aes-192-cbc` algorithm is used for encryption and decryption
- **Hexadecimal Numerical System** is used to as a language of encrypted-text
- Site is created using [nextjs](https://nextjs.org) and hosted on [vercel](https://vercel.com)
