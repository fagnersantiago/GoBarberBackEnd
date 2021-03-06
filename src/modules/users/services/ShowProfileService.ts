import User from '../infra/typeorm/entities/user';
import AppError from '../../../shared/erros/AppErros';
import IUsersRepository from '../repositories/IUserRepository';

import { inject, injectable } from 'tsyringe';

interface IRequest {
    user_id: string
}

@injectable()
class ShowProfileService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}
    public async execute({ user_id }: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('user not found');
        }

        return user;
    }
}

export default ShowProfileService;
