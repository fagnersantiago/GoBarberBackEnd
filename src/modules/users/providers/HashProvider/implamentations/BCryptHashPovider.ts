import { hash, compare } from 'bcryptjs';
import IHashProvider from '../models/IHashprovider';


class BCrypHashProvider implements IHashProvider{
    public async generalHash (payload: string): Promise<string>{

        return  hash (payload, 8)  
    }

    public async compareHash(payload: string, hashed: string): Promise<boolean>{
        return compare(payload, hashed);
    }
}

export default BCrypHashProvider;