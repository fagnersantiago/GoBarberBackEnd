import {container} from 'tsyringe';
import uploadConfig from '../../../../config/uploads';

import DiskStorageProvider from './models/DiskStorageProvider';
import IStorageProvider from './models/IStorageProvider';
import S3StorageProvider from '../implamatations/S3StorageProvider';

const provider = {
    disk: DiskStorageProvider,
    s3: S3StorageProvider,
}


container.registerSingleton<IStorageProvider>(
    'StorageProvider',   
    provider[uploadConfig.driver]
);
