import {container} from 'tsyringe';
import BCryptHashProvider from './HashProvider/implamentations/BCryptHashPovider';
import IHashProvider from './HashProvider/models/IHashprovider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);