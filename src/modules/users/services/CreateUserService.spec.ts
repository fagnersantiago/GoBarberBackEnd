import FakeUsersRepository from '../repositories/fake/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUsersServices from './CreateUsers';
import AppError from '../../../shared/erros/AppErros';
import FakeCacheProvider from '../../../shared/container/providers/CacheProvider/fakes/fakeCacheProvider';


let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUsersServices;

describe('CreateUsers', () =>{

    beforeEach(()=>{

        fakeUsersRepository= new FakeUsersRepository();
        fakeHashProvider= new FakeHashProvider();
        fakeCacheProvider = new FakeCacheProvider();
        createUser = new CreateUsersServices(fakeUsersRepository, fakeHashProvider, fakeCacheProvider  );


    })
    it('shoud be able to create a new user', async () =>{

        
        const user = await createUser.execute({
            name: 'John Doe',
            email: 'john@exemple.com.br',
            password: '123456'
        });

        expect(user).toHaveProperty('id');
        
    });

    it('shoud not be able to create a new user with same email from another', async () =>{

        await createUser.execute({
            name: 'John Doe',
            email: 'john@exemple.com.br',
            password: '123456'
        });

        expect(createUser.execute({
            name: 'John Doe',
            email: 'john@exemple.com.br',
            password: '123456'
        }) ).rejects.toBeInstanceOf(AppError)
        
    });

});