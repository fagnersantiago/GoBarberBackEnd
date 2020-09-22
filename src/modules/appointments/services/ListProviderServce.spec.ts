
import FakeUsersRepository from '../../../modules/users/repositories/fake/FakeUserRepository';
import AppError from '../../../shared/erros/AppErros';
import ListProvidersService from './ListProviderServices';
import FakeCacheProvider from '../../../shared/container/providers/CacheProvider/fakes/fakeCacheProvider'

let fakeUsersRepository:FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProvidersServices: ListProvidersService;

describe('ShowProfileServices', () => {

    beforeEach(()=>{

        fakeUsersRepository = new FakeUsersRepository();
        fakeCacheProvider = new FakeCacheProvider();
        listProvidersServices = new ListProvidersService(
            fakeUsersRepository,
            fakeCacheProvider,
        );

    });

    it('should be able to list the providers', async () => {
     
     const user1 = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

      const user2 =  await  fakeUsersRepository.create({
            name: 'John Does',
            email: 'johndoes@example1.com',
            password: '123456',
        
        });

        const loggedUser = await  fakeUsersRepository.create({
            name: 'John Four',
            email: 'johnfour@example2.com',
            password: '123456',
        
        });

        const providers = await listProvidersServices.execute({
            user_id: loggedUser.id,
        })

      expect(providers).toEqual([
          user1,
          user2,
      ]);

    });

   
});
