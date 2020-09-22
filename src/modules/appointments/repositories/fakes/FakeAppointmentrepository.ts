import { uuid } from 'uuidv4';
import { isEqual, getYear, getMonth, getDate} from 'date-fns';
import IAppointmentsRepository from '../../../appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '../../../../modules/appointments/dtos/ICreateAppointementDTO';
import IFindAllInMonthProviderDTO from '../../../../modules/appointments/dtos/IFindAllMonthfromProviderDTO';
import IFindAllInDayFromProviderDTO from '../../../../modules/appointments/dtos/IFindAllDayFromProviderDTO';
import Appointment from '../../infra/typeorm/entities/appointments';

class AppointmentsRepositories implements IAppointmentsRepository {
    private appointments: Appointment[] = [];

    public async findByDate(date: Date, provider_id:string): Promise<Appointment | undefined> {
        const findAppointment = this.appointments.find(appointment =>
            isEqual(appointment.date, date) && appointment.provider_id === provider_id
        );

        return findAppointment;
    }

    public async findAllMonthFromProvider({
        provider_id,
        month,
        year,
    }: IFindAllInMonthProviderDTO): Promise<Appointment[]> {
        const appointment = this.appointments.filter(appointment =>{
           return(
               appointment.provider_id === provider_id &&
               getMonth(appointment.date) + 1 === month &&
               getYear(appointment.date) === year
           );
        });

        return appointment;
    }

    public async findAllInDayFromProvider({
        provider_id,
        month,
        day,
        year,
       
    }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
        const appointment = this.appointments.filter(appointment =>{
           return(
               appointment.provider_id === provider_id &&
               getDate(appointment.date) + 1 === day &&
               getMonth(appointment.date) + 1 === month &&
               getYear(appointment.date) === year
           );
        });

        return appointment;
    }
    public async create({
        provider_id,
        user_id,
        date,
    }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = new Appointment();

        Object.assign(appointment, { id: uuid(), date, provider_id, user_id});

        this.appointments.push(appointment);

        return appointment;
    }

 
}

export default AppointmentsRepositories;
