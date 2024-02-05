import { NextFunction, Request, Response } from "express";
import { JWTAdapter } from "../../config";

export class JWTStrategy {
    
    public static async validateAccessToken(request: Request, response: Response, next: NextFunction) { 
        const bearerToken = request.headers['authorization'];
        if (!bearerToken) return response.status(400).json({ error: "You should provide a token" });
        const bearer = bearerToken.split(' ');
        const token = bearer[1];
        const isTokenValid = await JWTAdapter.validateToken(token!);
        if (!isTokenValid) return response.status(401).json({ error: "Token not valid!!" });
        next();
    }
    
}