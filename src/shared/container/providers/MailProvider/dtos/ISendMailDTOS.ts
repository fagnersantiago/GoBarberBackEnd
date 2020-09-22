import IParseMailTemplateDTO from '../../../../../shared/container/providers/MailTemplateProvider/dtos/IParseEmailTemplate';
interface IMailContac {
    name: string;
    email: string;
}

export default interface ISendMailDTO{

    to: IMailContac;
    from?: IMailContac;
    subject: string;
    template:IParseMailTemplateDTO;
}