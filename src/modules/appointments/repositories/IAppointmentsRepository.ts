import Appointment from '../infra/typeorm/entities/appointments';
import ICreateAppointment from '../dtos/ICreateAppointementDTO';
import IFindAllInMonthFromProviderDTO from '../dtos/IFindAllMonthfromProviderDTO';
import IFindAllInDayFromProviderDTO from '../dtos/IFindAllDayFromProviderDTO';

export default interface IAppointmentsRepository {
    create(date: ICreateAppointment): Promise<Appointment>;
    findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>;
    findAllMonthFromProvider(
        data: IFindAllInMonthFromProviderDTO,
    ): Promise<Appointment[]>;

    findAllInDayFromProvider(
        data: IFindAllInDayFromProviderDTO,
    ): Promise<Appointment[]>;
}
