import { compare } from "bcryptjs";

export default interface IHashProvider {
    generalHash(payload: string): Promise<string>
    compareHash(payload: string, hash: string): Promise <boolean> 
    
}