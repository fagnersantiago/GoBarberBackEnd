import IUsersRepository from '../repositories/IUserRepository';
import { inject, injectable } from 'tsyringe';
import path from 'path';
import IMailPRorvider from '../../../shared/container/providers/MailProvider/models/IMailProvider';
import IUserTokensRepository from '../../../modules/users/repositories/IUserTokenRepository ';
import AppError from '../../../shared/erros/AppErros';


interface IRequest {
    email: string;
}

@injectable()
class SendForgotPasswordEmailService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('MailProvider')
        private mailProvider: IMailPRorvider,

        @inject('UserTokensRepository')
        private userTokenRepository: IUserTokensRepository,
    ) {}

    public async execute({ email }: IRequest): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('user does not exist');
        }
        
       const { token } = await this.userTokenRepository.generate(user.id);

       const forgotPasswordTemplate = path.resolve(__dirname, '..', 'view','forgot_password.hbs');
        await this.mailProvider.sendMail({
             
            to:{
                name: user.name,
                email: user.email,
            },
            subject:'[GoBarber] Recuperação de senha',

            template:{
                file: forgotPasswordTemplate,
                variables:{
                    name: user.name,
                    link:`${process.env.APP_WEB_URL}/reset_password?token=${token}`
                }
            }
        });
    }
}

export default SendForgotPasswordEmailService;
