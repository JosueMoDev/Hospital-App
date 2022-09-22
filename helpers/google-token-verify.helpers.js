const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_MASTER_KEY);

async function googleTokenVerify(token) {
    if (token) {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_KEY
        });
        const payload = ticket.getPayload();
        console.log({ payload });
        return payload;
    }
    return;
}
googleTokenVerify().catch(console.error);

module.exports = { googleTokenVerify }