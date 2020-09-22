import { Router } from 'express';
import {celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated'
import AppointmentsController from '../controlers/AppointmentControler';
import ProviderAppointmentsController from '../controlers/ProviderAppointmentController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', celebrate({
    [Segments.BODY]: {
        provider_id: Joi.string().uuid().required(),
        date:Joi.date(),
    },
}),
 appointmentsController.create,
 );

appointmentsRouter.get('/me', providerAppointmentsController.index);


export default appointmentsRouter;