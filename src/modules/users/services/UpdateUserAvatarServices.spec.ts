import FakeStorageProvider from '../../../shared/container/providers/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fake/FakeUserRepository';
import AppError from '../../../shared/erros/AppErros';
import UpdateUserAvatarService from './UpdateUserAtarServices';
import FakeUsersRepositories from '../repositories/fake/FakeUserRepository';

let fakeUsersRepository:FakeUsersRepositories;
let fakeStorageProvider:FakeStorageProvider;
let updateUserSevice: UpdateUserAvatarService;

describe('UpdateUserAvatarServices', () => {

    beforeEach(()=>{

        fakeUsersRepository = new FakeUsersRepository();
        fakeStorageProvider = new FakeStorageProvider();

        updateUserSevice = new UpdateUserAvatarService(
            fakeUsersRepository,
            fakeStorageProvider,
        );

    });

    it('shoud be able to create a new user', async () => {
     
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        await updateUserSevice.execute({
            user_id: user.id,
            avatarFileName: 'avatar.jpg',
        });

        expect(user.avatar).toBe('avatar.jpg');
    });

    it('shoud not be able to update avatar from non existing user', async () => {
        
       await  expect( 
            updateUserSevice.execute({
            user_id:'non-existing-user',
            avatarFileName: 'avatar.jpg',
        }), 
        ).rejects.toBeInstanceOf(AppError);
    });

    it('shoud be able to delete old avatar when updating new one', async () => {
        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });
           await  updateUserSevice.execute({
            user_id:user.id,
            avatarFileName: 'avatar.jpg',
        }), 

           await  updateUserSevice.execute({
            user_id:user.id,
            avatarFileName: 'avatar2.jpg',
        }),
        
        expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
        expect(user.avatar).toBe('avatar2.jpg')
        
    });
});
