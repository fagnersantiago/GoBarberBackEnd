import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentrepository';
import FakeCacheProvider from '../../../shared/container/providers/CacheProvider/fakes/fakeCacheProvider'
import FakaNotificationsRepository from '../../../modules/notifications/repositories/fakes/fakeNotifications';
import CreateAppointmentsServices from './CreateAppointment';
import AppError from '../../../shared/erros/AppErros';

let fakeAppointmentRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider
let createAppointment: CreateAppointmentsServices;
let fakeNotificationRepository: FakaNotificationsRepository;
describe('CreateAppointment', () =>{
    beforeEach(()=>{
        fakeAppointmentRepository = new FakeAppointmentsRepository();
        fakeCacheProvider = new FakeCacheProvider();
        fakeNotificationRepository = new FakaNotificationsRepository();
        createAppointment = new CreateAppointmentsServices(
            fakeAppointmentRepository,
            fakeNotificationRepository,
            fakeCacheProvider,
        );
    });
    it('shoud be able to create a new appointment', async () =>{
        jest.spyOn(Date, 'now').mockImplementationOnce(() =>{

            return new Date(2020, 4, 10, 12).getTime();
         });
        const appointment = await createAppointment.execute({
            date: new Date(2020, 4, 10, 13),
            provider_id: 'provider-id',
            user_id:'user-id',       
         });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('provider-id');
    });

it('should  not be able to create two appointment at the same time', async () =>{

        const appointment = new Date(2020, 9, 1, 12);

         await createAppointment.execute({
            date:  appointment,
            provider_id: 'provider-id',
            user_id:'user-id',
        });

       await expect(
            createAppointment.execute({
                date:  appointment,
                provider_id: 'provider-id',
                user_id:'user-id',
            }),
        ).rejects.toBeInstanceOf(AppError)
    });

    it('should not be to crate an appointment on a past date', async () =>{
          jest.spyOn(Date, 'now').mockImplementationOnce(() =>{

             return new Date(2020, 4, 10, 12).getTime();
          });

         await expect(
            createAppointment.execute({
                date:  new Date(2020, 4, 10, 11 ),
                provider_id: 'provider-id',
                user_id:'user-id',            }),
        ).rejects.toBeInstanceOf(AppError);

    });

    it('should not be to crate an appointment with same user as provider', async () =>{
        jest.spyOn(Date, 'now').mockImplementationOnce(() =>{

           return new Date(2020, 4, 10, 12).getTime();
        });

       await expect(
          createAppointment.execute({
              date:  new Date(2020, 4, 10, 11 ),
              provider_id: 'provider-id',
              user_id:'user-id',
          }),
      ).rejects.toBeInstanceOf(AppError);

  });

  it('should not be to crate an appointment before 8am and after 5pm', async () =>{
    jest.spyOn(Date, 'now').mockImplementationOnce(() =>{

       return new Date(2020, 4, 11, 7).getTime();
    });

   await expect(
      createAppointment.execute({
          date:  new Date(2020, 4, 11, 18),
          provider_id: 'provider-id',
          user_id:'user-id',
      }),
  ).rejects.toBeInstanceOf(AppError);


  await expect(
    createAppointment.execute({
        date:  new Date(2020, 4, 10, 11 ),
        provider_id: 'provider-id',
        user_id:'user-id',
    }),
).rejects.toBeInstanceOf(AppError);


  });

});