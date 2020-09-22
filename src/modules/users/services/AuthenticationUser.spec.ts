import FakeUsersRepository from '../repositories/fake/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '../../../shared/container/providers/CacheProvider/fakes/fakeCacheProvider'
import AuthenticateUsersServices from './AuthenticationUsers';
import CreateUsersServices from './CreateUsers';
import AppError from '../../../shared/erros/AppErros';

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let fakeHashProvider:FakeHashProvider;
let  createUser: CreateUsersServices;
let authenticateUser: AuthenticateUsersServices;

describe('AuthenticateUser', () =>{

    beforeEach(()=>{

        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        fakeCacheProvider = new FakeCacheProvider();

        authenticateUser = new AuthenticateUsersServices(fakeUsersRepository, fakeHashProvider);

    });

    it('shoud be able to authenticate', async () =>{

        
        const  user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john@example.com.br',
            password: '123456'
        });

         
        const response = await authenticateUser.execute({
            email: 'john@example.com.br',
            password: '123456'
        })

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
        
        
    });


    it('shoud not be able to authenticate with  non existing user', async () =>{

       
       await  expect(  authenticateUser.execute({
            email: 'john@example.com.br',
            password: '123456'
        })
        ).rejects.toBeInstanceOf(AppError);
        
        
    });

    it('shoud not be able to authenticate with wrong password', async () =>{

         
        const  user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john@example.com.br',
            password: '123456'
        });
        


         
        await expect(authenticateUser.execute({
            email: 'john@example.com.br',
            password: 'wrong-password',
        }),
    
    ).rejects.toBeInstanceOf(AppError);
        
    });
  
});