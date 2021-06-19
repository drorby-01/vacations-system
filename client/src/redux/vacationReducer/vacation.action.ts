import { IVaction } from "../../interface/IVaction/IVavation";
import { Action } from "../Action";
import { IAction } from "../userReducer/user.reducer";

export const getVacations = (vacations:Array<IVaction>):IAction=>{
    return {
        type:Action.GETVACATIONS,
        payload:vacations
    }
}