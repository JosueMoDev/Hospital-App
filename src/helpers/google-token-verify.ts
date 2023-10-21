import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_KEY);
export const  googleTokenVerify = async (token: string) =>{
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_KEY,
  });
  const payload = ticket.getPayload();
  return payload;
}