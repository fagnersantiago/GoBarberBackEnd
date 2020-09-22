import {container} from 'tsyringe';
import '../../modules/users/providers'
import './providers';
import IAppointmentsRepository from '../../modules/appointments/infra/typeorm/repositories/appointmentsRepositories';
import AppointmentsRepository from '../../modules/appointments/infra/typeorm/repositories/appointmentsRepositories';
import IUsersRepository from '../../modules/users/repositories/IUserRepository'
import UsersRepository from '../../modules/users/infra/typeorm/repositories/UserRepository';
import IUserTokensRepository from '../../modules/users//repositories/IUserTokenRepository ';
import UserTokensRepository from '../../modules/users/infra/typeorm/repositories/UserTokenRepository';
import '../../modules/users/providers';
import INotificationsRepository from '../../modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '../../modules/notifications/infra/typeorm/repositories/NotificationsRepository';

container.registerSingleton<IAppointmentsRepository>(
    'AppointmentsRepository',
    AppointmentsRepository
);

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository
);

container.registerSingleton<IUserTokensRepository>(
    'IUserTokensRepository',
    UserTokensRepository,
);

container.registerSingleton<INotificationsRepository>(
    'NotificationsRepository',
    NotificationsRepository,
);