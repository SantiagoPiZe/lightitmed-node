const axios = require('axios');
const crypto = require('crypto');

const apiKey = 'santiago.pi.ze@gmail.com';
const secretKey = 'j3RSp7o6T5Ywq4H8W';

async function login() {
    const uri = 'https://sandbox-authservice.priaid.ch/login';
    const format = 'json';

    //HMACMD5 hash value
    const hash = crypto.createHmac('md5', secretKey)
        .update(uri)
        .digest('base64');

    //authorization header
    const authorization = `Bearer ${apiKey}:${hash}`;

    // Set request headers
    const headers = {
        Authorization: authorization
    };

    try {
        const response = await axios.post(`${uri}`, '', { headers });
        const token = response.data.Token;
        return token;
    } catch (error) {
        console.error('Login failed:', error.message);
        throw error;
    }

}

module.exports = {
    login
};