import { Request, Response, NextFunction, response} from 'express';
import redis from 'redis';
import {RateLimiterRedis} from 'rate-limiter-flexible';
import APPError from '../../../erros/AppErros'


const redisClient  = redis.createClient({

    host: process.env.REDIS_HOST,
    port: Number (process.env.REDIS_PORT),
    password: process.env.REDIS_PASS || undefined,
    
});

const limiter = new  RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix:'ratellimit',
    points:5,
    duration:1,
})

export default async function reteLimiter(
    request: Request,
    response: Response,
    next: NextFunction
): Promise <void>{

    try{

        await limiter.consume(request.ip);

        return next();

    }catch(err){
            
        throw new APPError('Too requests', 429);
    }
}