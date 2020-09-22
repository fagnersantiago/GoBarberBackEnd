import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fake/FakeUserRepository';
import AppError from '../../../shared/erros/AppErros';
import UpdateProfileService from './UpdateProfileServices';
import FakeUsersRepositories from '../repositories/fake/FakeUserRepository';

let fakeUsersRepository:FakeUsersRepositories;
let fakeHashProvider:FakeHashProvider;
let updateProfileSevice: UpdateProfileService;

describe('UpdateProfileServices', () => {

    beforeEach(()=>{

        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        updateProfileSevice = new UpdateProfileService(
            fakeUsersRepository,
            fakeHashProvider,
        );

    });

    it('should be able to update profile', async () => {
     
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const updateUser = await  updateProfileSevice.execute({
            user_id: user.id,
            name: 'John Does',
            email:'johnDoes@example1.com.br',
        });

     expect(updateUser.name).toBe('John Does');
     expect(updateUser.email).toBe('johnDoes@example1.com.br');
    });

    it('should not be able to update to profile from non-existing user', async () => {
     
        expect(

               updateProfileSevice.execute({
                user_id: 'non-existing-user-id',
                name: 'Test',
                email: 'teste@example.com.br',
            
            }),

        ).rejects.toBeInstanceOf(AppError);
    })

    it('should not be able to change to another user email', async () => {
     
         await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const user = await fakeUsersRepository.create({
            name: 'Teste',
            email:'teste@example1.com.br',
            password: '123456',
        });

     await expect(updateProfileSevice.execute({
            user_id: user.id,
            name: 'John trê',
            email:'johndoe@example.com',
        }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to update the password', async () => {
     
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const updateUser = await  updateProfileSevice.execute({
            user_id: user.id,
            name: 'John Does',
            email:'johnDoes@example1.com.br',
            old_password:'123456',
            password:'123123',
        });

      expect(updateUser.password).toBe('123123');
     
    });
    
    it('should not be able to update the password without old password', async () => {
     
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

      await expect(
      updateProfileSevice.execute({
        user_id: user.id,
        name: 'John Does',
        email:'johnDoes@example1.com.br',
        old_password:'123123',
        password:'123123',
      }),

      ).rejects.toBeInstanceOf(AppError);
     
    });


    it('should not be able to update the password with wrong old password', async () => {
     
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

      await expect(
      updateProfileSevice.execute({
        user_id: user.id,
        name: 'John Does',
        email:'johnDoes@example1.com.br',
        old_password:'wrong-old-password',
        password:'123123',
      }),

      ).rejects.toBeInstanceOf(AppError);
     
    });
  
});
