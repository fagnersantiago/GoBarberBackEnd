import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authoConfig from '../../../../../config/autho';
import AppError from '../../../../../shared/erros/AppErros';

interface TokenPayload{

    iat: number;
    exp:number;
    sub:string
}


export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void {

    const authHeader = request.headers.authorization;

    if (!authHeader) {


        throw new AppError('JWT token is missing',401);


    }

    const [, token] = authHeader.split(' ')
    
    console.log(token)

    try {

        const decoded = verify(token, authoConfig.jwt.secret);

        const {sub} = decoded as TokenPayload

        request.user ={
            id:sub
        }

        return next();

    } catch {
        throw new AppError('invalid JWT token',401);
    }

}