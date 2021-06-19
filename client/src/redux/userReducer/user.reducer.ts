import { IUserLogin } from "../../interface/IUserLogin/IUserLogin";
import { Action } from "../Action";

const initalState: IUserLogin = {
  userId:0,
  isAdmin:0,
  token:""
};

export interface IAction{
    type:string,
    payload:any
}

export const userReducer =(state=initalState,action:IAction)=>{
    let copyState= {...state}
    
    switch(action.type){
        case Action.SAVEUSER: {
            console.log(action.payload)
            return action.payload        
        }
        default:return copyState
    }
}
