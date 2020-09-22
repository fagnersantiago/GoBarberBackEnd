import FakeUsersRepository from '../repositories/fake/FakeUserRepository';
import FakeMailProvider from '../../../shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPassword from './SendForgotPasswordEmailService';
import FakeUserTokenRepository from '../../users/repositories/fake/FakeUserTokenRepository';
import AppError from '../../../shared/erros/AppErros';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUsersTokenRepository: FakeUserTokenRepository;
let fakeUserProvider: FakeMailProvider;
let sendForgotPassword: SendForgotPasswordEmailService;


describe('SendForgotPassword', () => {

    beforeEach(()=>{

        fakeUsersRepository = new FakeUsersRepository();
        fakeUserProvider = new FakeMailProvider();
        fakeUsersTokenRepository = new FakeUserTokenRepository();

        sendForgotPassword = new SendForgotPassword(
            fakeUsersRepository,
            fakeUserProvider,
            fakeUsersTokenRepository,
        );
    })
    it('shoud be able to recover the password using the email', async () => {
        

        const sendMail = jest.spyOn(fakeUserProvider, 'sendMail');

        await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john@explemple.com.br',
            password: '123456',
        });

        await sendForgotPassword.execute({
            email: 'john@explemple.com.br',
        });

        expect(sendMail).toHaveBeenCalled();
    });

    it('should not be able to recover a non-existing user password', async()=>{

       await expect (
            sendForgotPassword.execute({
                email: 'john@example.com'
            }),
        ).rejects.toBeInstanceOf(AppError)
    });

    it('should generate a forgot password token', async()=>{

        const generateToken = jest.spyOn(fakeUsersTokenRepository, 'generate');

        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john@example.com.br',
            password: '123456',
        });

       await sendForgotPassword.execute({
        email: 'john@example.com.br',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });

});
