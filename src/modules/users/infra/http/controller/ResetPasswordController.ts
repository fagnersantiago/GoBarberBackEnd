import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ResetPasswordController from '../../../../../modules/users/services/ResetPassword';

export default class ResetPasswordService {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { password, token } = request.body;

        const resetPassword = container.resolve(ResetPasswordController);

        await resetPassword.execute({
            password,
            token,
        });

        return response.status(204).json();
    }
}
