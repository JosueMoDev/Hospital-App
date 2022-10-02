const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_MASTER_KEY);

async function googleTokenVerify(token) {

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_KEY
    });
    const payload = ticket.getPayload();
    return payload;
  
}


module.exports = { googleTokenVerify }