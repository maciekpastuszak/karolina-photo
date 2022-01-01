const crypto = require('crypto');

// Generate a new random nonce value for every response.
const nonce = crypto.randomBytes(16).toString("base64");

module.exports = nonce;