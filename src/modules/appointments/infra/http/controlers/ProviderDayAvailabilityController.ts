import {Request, Response} from 'express';
import { parseISO } from 'date-fns';
import {container} from 'tsyringe';
import ListProviderDayAvailabilityService from '../../../services/ListProviderDayAvailabilityServices';


export default class ProviderMonthAvailabilityController{
    public async index(request:Request, response: Response):Promise<Response>{
    
        const { provider_id } = request.params;

        const { day, month, year} = request.query;

        const listProviderDayAvailability = container.resolve(ListProviderDayAvailabilityService);
    
        const availability = await listProviderDayAvailability.execute({
             provider_id,
             day: Number(day),
             month:Number(month),
             year:Number(year),
        });
    
        return response.json(availability);
    }
}