import { combineReducers,createStore} from "redux"
import { routerReducer } from "./RouterReducer/router.reducer"
import { userReducer } from "./userReducer/user.reducer"
import { vacationReducer } from "./vacationReducer/vacation.reducer"




const store = createStore(combineReducers({userReducer,vacationReducer:vacationReducer,routerReducer}))

export default store