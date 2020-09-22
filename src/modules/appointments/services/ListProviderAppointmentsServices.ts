import { inject, injectable } from 'tsyringe';
import ICacheProvider from '../../../shared/container/providers/CacheProvider/modules/ICacheProvider';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import Appointment from '../infra/typeorm/entities/appointments';
import { classToClass } from 'class-transformer';

interface IRequest {
    provider_id: string;
    day: number;
    month: number;
    year: number;
}

@injectable()
class ListProviderAppointmentsServices {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute({
        provider_id,
        year,
        day,
        month,
    }: IRequest): Promise<Appointment[]> {

        const cachekey = `provider-appointments:${provider_id}:${year}-${day}-${month}`

        let appointments = await  this.cacheProvider.recover<Appointment[]>(
            cachekey
        )
        
        if(!appointments){


            appointments = await this.appointmentsRepository.findAllInDayFromProvider(
                {
                    provider_id,
                    day,
                    year,
                    month,
                },
            );
        }
     

        await  this.cacheProvider.save(cachekey, classToClass(appointments));
        
        return appointments;
    }
}

export default ListProviderAppointmentsServices;
