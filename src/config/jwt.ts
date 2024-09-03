import jwt from 'jsonwebtoken';
import { envs } from './envs';
export class Jwt{

    static async generateToken
    (payload: Object, duration: string = '2h'): Promise<string|null>{

        return new Promise((resolve) => {
            jwt.sign(payload, envs.seed!, {expiresIn: duration}, (err, token) => {
                if(err) return resolve(null);

                resolve(token!);
            });
        })
    }

    static async validateToken<T>(token: string): Promise<T | null>{
        return new Promise((resolve)=>{
            jwt.verify(token, envs.seed!, (err, decode) => {
                if( err ) return resolve(null);

                resolve(decode as T);
            });
        });
    }
}