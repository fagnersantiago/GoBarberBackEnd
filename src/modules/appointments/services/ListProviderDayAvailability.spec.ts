import AppError from '../../../shared/erros/AppErros';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentrepository';
import ListProvidersDayAvailability from './ListProviderDayAvailabilityServices';


let fakeAppointmentsRepository:FakeAppointmentsRepository;
let listProvidersDayAvailability: ListProvidersDayAvailability;

describe('ListProvidersDayAvailability', () => {

    beforeEach(()=>{

        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProvidersDayAvailability = new ListProvidersDayAvailability (
            fakeAppointmentsRepository,
        );

    });

    it('should be able to list the day availability from provider', async () => {
     
        jest.spyOn(Date, 'now').mockImplementationOnce(() =>{

            return  new Date(2020, 4, 21, 11 ).getTime();
        });
        await fakeAppointmentsRepository.create({
            provider_id:'provider-id',
            user_id:'provider-id',
            date: new Date(2020, 4, 21, 14, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id:'provider-id',
            user_id:'provider-id',
            date: new Date(2020, 4, 21, 15, 0, 0),
        });
 

        const availability = await listProvidersDayAvailability.execute({
            provider_id:'provider-id',
            year: 2020,
            month: 5,
            day: 21,
        });
        
         expect(availability).toEqual( expect.arrayContaining([
             {hour: 8, available: false},
             {hour: 9, available: false},
             {hour: 10, available: false},
             {hour: 13, available: true},
             {hour: 14, available: false},
             {hour: 15, available: false},
             {hour: 16, available: true},
    
         ]));       
    });
   
});
