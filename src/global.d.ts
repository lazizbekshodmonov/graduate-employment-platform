import { IContextUser } from './common/interfaces/contex.interface';
declare module 'express' {
  export interface Request {
    user?: IContextUser;
  }
}
