import { ILogin } from "../../interface/ILogin/ILogn";
import { IUserLogin } from "../../interface/IUserLogin/IUserLogin";
import { Action } from "../Action";


export const userLogin = (user:IUserLogin)=>{   
    return {
        type:Action.SAVEUSER,
        payload:user
    }
}

