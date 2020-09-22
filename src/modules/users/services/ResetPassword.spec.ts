import FakeUsersRepository from '../repositories/fake/FakeUserRepository';
import FakeUserTokenRepository from '../../users/repositories/fake/FakeUserTokenRepository';
import ResetPasswordService from './ResetPassword';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AppError from '../../../shared/erros/AppErros';

let fakeUsersRepository: FakeUsersRepository;
let fakeUsersTokenRepository: FakeUserTokenRepository;
let resetPassword: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;


describe('ResetPassword', () => {

    beforeEach(()=>{

        fakeUsersRepository = new FakeUsersRepository();
        fakeUsersTokenRepository = new FakeUserTokenRepository();
        fakeHashProvider = new FakeHashProvider();

        resetPassword = new ResetPasswordService(
            fakeUsersRepository,
            fakeUsersTokenRepository,
            fakeHashProvider
        );
    });

    it('shoud be able to reset password', async () => {
        

        const user = await fakeUsersRepository.create({

            name: 'John Doe',
            email: 'john@explemple.com.br',
            password: '123456',
        });

        const {token} = await fakeUsersTokenRepository.generate(user.id);

        const generateHash = jest.spyOn(fakeHashProvider, 'generalHash');
        await resetPassword.execute({
            password: '123123',
            token,
        });

        const updatedUser = await fakeUsersRepository.findById(user.id);

        expect(generateHash).toBeCalledWith('123123');
        expect(updatedUser?.password).toBe('123123');
    });

    it('should be able  to reset the password with non-existing token', async()=>{
        await expect(
            resetPassword.execute({
            
                token: 'non-exiting-token',
                password:'123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    
    it('should not be able to reset the password with non-existing token', async()=>{

        const {token} = await fakeUsersTokenRepository.generate('non-existing-user');

        await expect(
            resetPassword.execute({
            
                token,
                password:'123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('shoud not be able to reset password if passed more than 2 hours ', async () => {
        

        const user = await fakeUsersRepository.create({

            name: 'John Doe',
            email: 'john@explemple.com.br',
            password: '123456',
        });

        const {token} = await fakeUsersTokenRepository.generate(user.id);

        jest.spyOn(Date, 'now').mockImplementationOnce(()=>{
            const customDate = new Date();

            return customDate.setHours(customDate.getHours()+ 3);
        });
        
        await expect(
        resetPassword.execute({
            password: '123123',
            token,
        }),
    ).rejects.toBeInstanceOf(AppError);

    });

});
