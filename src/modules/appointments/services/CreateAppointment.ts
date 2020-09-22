import Appointment from '../infra/typeorm/entities/appointments';
import { startOfHour, isBefore, getHours, format} from 'date-fns';
import { injectable, inject } from 'tsyringe';
import AppError from '../../../shared/erros/AppErros';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import INotificationsRepository from '../../../modules/notifications/repositories/INotificationsRepository';
import ICacheProvider from '../../../shared/container/providers/CacheProvider/modules/ICacheProvider';

interface IRequest {
    provider_id: string;
    user_id: string;
    date: Date;
}

@injectable()
class CreateAppointmentsServices {
    constructor(
        @inject('AppointmentRepository')
        private appointmentsRepository: IAppointmentsRepository,

        @inject('NotificationRepository')
        private notificationsRepository: INotificationsRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,

    ) {}

    public async execute({
        provider_id,
        user_id,
        date,
    }: IRequest): Promise<Appointment> {
        const appointmentDate = startOfHour(date);
        if(isBefore(appointmentDate, Date.now())){

            throw new AppError('You cannot create an appointment on a past dates.');
        }

        if(user_id === provider_id){
            throw new  AppError('You cannot  create an appointment with yourself')
        }

        if(getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17){

            throw new AppError('You cannot create an appointments between 8am and 5pm');
        }

        const findAppointmentsinSameDate = await this.appointmentsRepository.findByDate(
            appointmentDate,
            provider_id,
        );

        if (findAppointmentsinSameDate) {
            throw new AppError('This appointements is already booked ');
        }

        
        const appointment = await this.appointmentsRepository.create({
            provider_id,
            user_id,
            date: appointmentDate,
        });

       
        const dateFormated = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm");

        await this.notificationsRepository.create({
            recipient_id: provider_id,
            content: `Novo agendamento para o dia ${dateFormated}`
        });

        await  this.cacheProvider.invalidate(
           `provider-appointments:${provider_id}:${format(
               appointmentDate,
               'yyyy-M-d'
           )}`,
        );

        return appointment;
    }

  
}

export default CreateAppointmentsServices;
