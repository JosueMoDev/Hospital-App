import { OAuth2Client } from 'google-auth-library';
import { Environment } from '../envs/envs';

export class GoogleOAuth2ClientAdapter {
  private static client = new OAuth2Client();
  private static googleClientId = Environment.GOOGLE_CLIENT_KEY;

  static async verify(token: string) {
    const ticket = await this.client.verifyIdToken({
      idToken: token,
      audience: this.googleClientId,
    });

    return ticket.getPayload();
  }
}
