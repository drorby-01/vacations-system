import { IVaction } from "../../interface/IVaction/IVavation";
import { Action } from "../Action";
import { IAction } from "../userReducer/user.reducer";

const initalState: { vacations: Array<IVaction> } = {
  vacations: [],
};

export const vacationReducer = (state = initalState, action: IAction) => {
  const copyState = { ...state };

  switch (action.type) {
    case Action.GETVACATIONS: {
      copyState.vacations = action.payload;
    }
  }
  return copyState;
};
