import {container} from 'tsyringe';
import ICacheProvider from './modules/ICacheProvider';
import RedisCacheProvider from './implementations/RedisCacheProvider';


const provider = {
    redis: RedisCacheProvider,
    
}


container.registerSingleton<ICacheProvider>(
    'CacheProvider',   
    provider.redis
);
