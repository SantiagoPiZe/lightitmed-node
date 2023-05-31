const axios = require('axios');
const crypto = require('crypto');

const apiKey = 'Fi75K_GMAIL_COM_AUT';
const secretKey = 'm2SEg4a7T3MiFo8t6';

async function login() {
    const uri = 'https://authservice.priaid.ch/login';
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