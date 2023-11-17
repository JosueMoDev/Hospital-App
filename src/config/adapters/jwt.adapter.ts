import jwt from 'jsonwebtoken';
import { Environment } from '../envs';

const JWT_SEED = Environment.SECRET_KEY_JWT;

export class JWTAdapter { 

    static async generateToken(payload: any, duration: string = '2h'): Promise<string | null> {
        return new Promise((resolve) => {
            jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (error, token) => {
                if (error) return resolve(null);
                if (!token) return resolve(null);
                resolve(token);
            });
        });
    }

    static validateToken<T>(token: string): Promise<T | null>{
        return new Promise((resolve) => {
            jwt.verify(token, JWT_SEED, (err, decoded) => {
                if (err) return resolve(null);
                resolve(decoded as T);
            })
        });
    }
}