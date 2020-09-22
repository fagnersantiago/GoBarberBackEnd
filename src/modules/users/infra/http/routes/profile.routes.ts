import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ProfileController from '../controller/ProfileController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';


const profileRouter = Router();
const profileCrontroller = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileCrontroller.show);
profileRouter.put('/',   celebrate({
    [Segments.PARAMS]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        old_password:Joi.string(),
        password: Joi.string(),
        password_confirmation:Joi.string().valid(Joi.ref('password'))
    },
}), profileCrontroller.update);


export default profileRouter; 