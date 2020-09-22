import IUsersRepository from '../repositories/IUserRepository';
import { inject, injectable } from 'tsyringe';
import IUserTokensRepository from '../../../modules/users/repositories/IUserTokenRepository ';
import IHashProvider from '../providers/HashProvider/models/IHashprovider';
import {isAfter, addHours} from 'date-fns';
import AppError from '../../../shared/erros/AppErros';


interface IRequest {
    token:string,
    password: string;
}

@injectable()
class SendForgotPasswordEmailService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('IUserTokensRepository')
        private userTokenRepository: IUserTokensRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({token, password }: IRequest): Promise<void> {

        const userToken = await this.userTokenRepository.findByToken(token);

        if(!userToken){
            throw new AppError('user token does not exists');
        }
        const user = await this.usersRepository.findById(userToken.user_id);

        if(!user){

            throw new AppError('user does not exists');
        }
      
        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);

        if(isAfter(Date.now(), compareDate)){

              throw new AppError('Token expired.')
        }
        user.password = await this.hashProvider.generalHash(password);

        await this.usersRepository.save(user);
    }
}

export default SendForgotPasswordEmailService;
