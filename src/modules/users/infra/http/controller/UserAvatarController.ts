import {Request, Response} from 'express';
import {container}  from 'tsyringe';
import {classToClass} from 'class-transformer';
import UpdateUserAvatarService from '../../../../users/services/UpdateUserAtarServices';


export default class  UserAvatarController {
    public async update(request: Request, response: Response): Promise <Response>{

        const updateuseravatar = container.resolve(UpdateUserAvatarService);
   
            const user = await updateuseravatar.execute({
            user_id: request.user.id,
            avatarFileName: request.file.filename,

    });

    return response.json(classToClass(user));

    

    }
}