import{sign} from 'jsonwebtoken';
import {inject, injectable} from 'tsyringe';
import authConfig from '../../../config/autho'
import User from '../infra/typeorm/entities/user';
import AppError from '../../../shared/erros/AppErros';
import IUsersRepository from '../repositories/IUserRepository';
import IHashProvider from '../providers/HashProvider/models/IHashprovider';

interface IRequest {
    email: string,
    password: string
}


interface IResponse {

    user : User;
    token: string;
}


@injectable()
class AuthenticateUser {
 
  
    constructor(
        @inject('UsersRepository')
        private usersRepository:IUsersRepository,
        
        @inject('HashProvider')
        private hashprovider: IHashProvider,
        ){}

    public async execute({email, password}:IRequest): Promise<IResponse>{

        const user = await this.usersRepository.findByEmail(email);

        if(!user){

            throw new AppError ('Incorrect email/password combination',401);
        }

        const passwordMatched = await this.hashprovider.compareHash(password, user.password);

        if(!passwordMatched){

            throw new AppError ('Incorrect email/password combination', 401);

        }

        const {secret, expiresIn} = authConfig.jwt;
        const token = sign({}, secret, {
            subject:user.id,
            expiresIn,
        });

        return {
            user,
            token,
        };
    }
}

export default AuthenticateUser;