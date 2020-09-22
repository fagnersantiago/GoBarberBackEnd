
import FakeUsersRepository from '../repositories/fake/FakeUserRepository';
import AppError from '../../../shared/erros/AppErros';
import ShowProfileService from './ShowProfileService';
import FakeUsersRepositories from '../repositories/fake/FakeUserRepository';

let fakeUsersRepository:FakeUsersRepositories;
let showProfileSevice: ShowProfileService;

describe('ShowProfileServices', () => {

    beforeEach(()=>{

        fakeUsersRepository = new FakeUsersRepository();
        showProfileSevice = new ShowProfileService(
            fakeUsersRepository,
            
        );

    });

    it('should be able to show profile', async () => {
     
    const user =  await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const profile = await  showProfileSevice.execute({
            user_id: user.id,
        
        });

      expect(profile.name).toBe('John Doe');
     expect(profile.email).toBe('johndoe@example.com');
    });

    it('should not be able to show profile from non-existing user', async () => {
     
        expect(

               showProfileSevice.execute({
                user_id: 'non-existing-user-id',
            
            }),

        ).rejects.toBeInstanceOf(AppError);
    })
   
});
