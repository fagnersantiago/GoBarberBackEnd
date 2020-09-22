import {container} from 'tsyringe';
import IMailTemplateProvider from './models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './implementations/HandleMailTemplateProvider';



const provider = {
    handlebar: HandlebarsMailTemplateProvider,
}

container.registerSingleton<IMailTemplateProvider>(
    'MailTemplateProvider',
    HandlebarsMailTemplateProvider,
);
