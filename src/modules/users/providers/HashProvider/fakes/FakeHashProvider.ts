import IHashProvider from '../models/IHashprovider';


class FakeHashProvider implements IHashProvider{
    public async generalHash (payload: string): Promise<string>{

        return  payload;  
    }

    public async compareHash(payload: string, hashed: string): Promise<boolean>{
        return payload === hashed;
    }
}

export default FakeHashProvider;