import {inject, injectable} from 'tsyringe';
import User from '../infra/typeorm/entities/user';
import AppError from '../../../shared/erros/AppErros';
import IUsersRepository from '../repositories/IUserRepository';
import IHashProvider from '../providers/HashProvider/models/IHashprovider';
import ICacheProvider from '../../../shared/container/providers/CacheProvider/modules/ICacheProvider';

interface IRequest {
    name: string;
    email: string;
    password: string
};

@injectable()
class CreateUsers{

    constructor(
        @inject('UsersRepository')
        private usersRepository:IUsersRepository,
        
        @inject('HashProvider')
        private hashProvider: IHashProvider,
        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,

        ){}

   public async execute({name, email, password}:IRequest ) :Promise<User>{

    const checkUserExist = await this.usersRepository.findByEmail(email)

    if(checkUserExist){

      throw new AppError('Email already used');
    
 
      }

        const hashedPassword =  await this.hashProvider.generalHash(password);

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,

      });
     
      await this.cacheProvider.invalidatePrefix('provider-list')
     
      return user;

    }

  }


export default CreateUsers;