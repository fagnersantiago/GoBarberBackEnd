import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentrepository';
import FakeCacheProvider from '../../../shared/container/providers/CacheProvider/fakes/fakeCacheProvider';
import ListProviderAppointment from './ListProviderAppointmentsServices';


let fakeAppointmentsRepository:FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviderAppointment: ListProviderAppointment;

describe('ListProviderAppointment', () => {

    beforeEach(()=>{

        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        fakeCacheProvider = new FakeCacheProvider();
        listProviderAppointment = new ListProviderAppointment (
            fakeAppointmentsRepository,
            fakeCacheProvider
        );

    });

    it('should be able to list the appointments on a specific day', async () => {
    
        const appointment1 = await fakeAppointmentsRepository.create({ 
            provider_id:'provider',
            user_id:'user',
            date: new Date(2020, 4, 20, 14, 0, 0),
        });

       const appointment2 = await fakeAppointmentsRepository.create({
            provider_id:'provider',
            user_id:'user',
            date: new Date(2020, 4, 20, 15, 0, 0),
        });
 

        const appointments = await listProviderAppointment.execute({
            provider_id:'provider',
            year: 2020,
            month: 5,
            day: 20,
        });
        
         expect(appointments).toEqual( [appointment1, appointment2]);    
    });
   
});
