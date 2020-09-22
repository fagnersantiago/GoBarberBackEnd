import {container} from 'tsyringe';
import mailConfig from '../../../../config/mail';
import EtherealProvider from './implementation/EtherealMailProvider';
import SESProvider from './implementation/SESMailProvider';
import IMailProvider from './models/IMailProvider';


const provider = {
    ethereal: container.resolve( EtherealProvider),
    ses: container.resolve(SESProvider),
}


container.registerInstance<IMailProvider>(
    'MailProvider',   
    provider [mailConfig.driver]
);
