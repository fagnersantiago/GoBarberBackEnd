import IParseMailTemplateDTO from '../dtos/IParseEmailTemplate';
export default interface IMailTemplateProvider{

    parse(data: IParseMailTemplateDTO): Promise<string>

}