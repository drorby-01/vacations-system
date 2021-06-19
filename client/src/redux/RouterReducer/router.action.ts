import { Action } from "../Action"

export const linkUser = ()=>{
    return {
        type:Action.HOMEPAGEUSER,

    }
}

export const linkAdmin = () =>{
    return {
        type:Action.HOMEPAGEADMIN
    }
}

export const loginPage = ()=>{
    return {
        type:Action.LOGINPAGE
    }
}