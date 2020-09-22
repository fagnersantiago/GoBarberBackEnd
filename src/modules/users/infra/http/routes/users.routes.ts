import { Router, request, response } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';
import uploadConfig  from '../../../../../config/uploads';
import UsersControllerServices from '../controller/UsersController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UserAvatarController from '../controller/UserAvatarController';


const usersRouter = Router();
const usersCrontroller = new UsersControllerServices();
const userAvatarController = new UserAvatarController();
const upload = multer (uploadConfig.multer);


usersRouter.post('/',  celebrate({
    [Segments.BODY]: {
       
        name:Joi.string().required(),
        email: Joi.string().email().required(),
        password:Joi.string().required(),
    },
}), usersCrontroller.create);

usersRouter.patch(
    '/avatar',
     ensureAuthenticated, 
     upload.single('avatar'),
     userAvatarController.update,

);

export default usersRouter; 