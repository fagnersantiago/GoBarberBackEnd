import User from '../infra/typeorm/entities/user';
import AppError from '../../../shared/erros/AppErros';
import IUsersRepository from '../repositories/IUserRepository';
import IStorageProvider from '../../../shared/container/providers/StorageProvider/models/IStorageProvider'
import { inject, injectable } from 'tsyringe';


interface IRequest {
    user_id: string;
    avatarFileName: string;
}

@injectable()
class UpdateUserAvatarService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,

    ) {}
    public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError(
                'Only authenticated users can change avatar',
                401,
            );
        }

        if (user.avatar) {
      
            await this.storageProvider.deleteFile(user.avatar)
    

            const filename = await this.storageProvider.saveFile(avatarFileName);
        }

        user.avatar = avatarFileName;

        await this.usersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;
