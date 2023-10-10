import jwt, { JwtPayload } from 'jsonwebtoken';
export const JWTGenerated = (user_id : string) => {
  return new Promise((resolve, reject) => {
    const payload : JwtPayload = {
      user_id,
    };
    jwt.sign(
      payload,
      process.env.SECRET_KEY_JWT!,
      {
        expiresIn: "12h",
      },
      (error, token) => {
        if (error) {
          reject("We could not geneted a token");
        }
        {
          resolve(token);
        }
      }
    );
  });
};
