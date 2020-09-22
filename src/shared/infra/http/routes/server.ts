import 'reflect-metadata';
import 'dotenv/config';
import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors';
import {errors} from 'celebrate';
import 'express-async-errors';
import routes from '.';
import AppError from '../../../erros/AppErros';
import rateLimiter from '../middlewares/rateLimmiter'
import uploadConfig from '../../../../config/uploads'
import '../../../../shared/container'


const app = express();
app.use(rateLimiter)
app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

app.use(errors());

app.use((err: Error, request: Request, response:Response, next:NextFunction)=>{

 if(err instanceof AppError){

    return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
    });
 }

 return response.status(500).json({
     status: 'error',
     message: err.message
 })

});

app.listen(3333, ()=>{

    console.log('server started on port 3333');
});
