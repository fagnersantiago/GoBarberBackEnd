import {Request, Response} from 'express';
import {container}  from 'tsyringe';
import SendForgotPasswordEmail from '../../../../../modules/users/services/SendForgotPasswordEmailService';


export default class SessionsController {
    public async create(request: Request, response: Response): Promise <Response>{

        const {email, password} = request.body;

        const authenticateUser = container.resolve(SendForgotPasswordEmail);

         await authenticateUser.execute({
            email,
            
        });
 
        return response.status(204).json();


    }
}