import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import CreateAppointmentsServices from '../../../services/CreateAppointment';

export default class AppointmentController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const user_id = request.user.id;
        const { provider_id, date } = request.body;


        const createAppointments = container.resolve(
            CreateAppointmentsServices,
        );

        const appointment = await createAppointments.execute({
            date,
            provider_id,
            user_id,
        });

        return response.json(appointment);
    }
}
