import { IRoute } from "../../interface/IRoute/IRoute";
import AddVacation from "../../pages/AddVacation/AddVacation";
import DeleteVacation from "../../pages/DeleteVacation/DeleteVacation";
import EditVacation from "../../pages/EditVacation/EditVacation";
import Login from "../../pages/login-page/Login";
import Register from "../../pages/registration-page/Register";
import VacationAdmin from "../../pages/vacation-admin-page/VacationAdmin";
import VacationUser from "../../pages/vacation-user-page/VacationUser";
import VacationGraphFollow from "../../pages/VacationGraphFollow/VacationGraphFollow";
import { Action } from "../Action";
import { IAction } from "../userReducer/user.reducer";

const initalState: Array<IRoute> = [
  {
    path: "/login",
    component: Login,
    exact: true,
    name: "Login",
    isVisibale: true,
  },
  {
    path: "/register",
    component: Register,
    exact: true,
    name: "Register",
    isVisibale: true,
  },
  {
    path: "/vacation/user",
    component: VacationUser,
    exact: true,
    name: "Home",
    isVisibale: false,
  },
  {
    path: "/vacation/admin",
    component: VacationAdmin,
    exact: true,
    name: "Home",
    isVisibale: false,
  },
  {
    path: "/vacation/admin/add",
    component: AddVacation,
    exact: true,
    name: "Add Vacation",
    isVisibale: false,
  },
  {
    path: "/vacation/admin/edit/:id",
    component: EditVacation,
    exact: true,
    name: "Edit Vacation",
    isVisibale: false,
  },
  {
    path: "/vacation/admin/delete/:id",
    component: DeleteVacation,
    exact: true,
    name: "Delete Vacation",
    isVisibale: false,
  },
  {
    path: "/vacation/admin/vacationGraph",
    component: VacationGraphFollow,
    exact: true,
    name: "Vacation Graph",
    isVisibale: false,
  },
];

export const routerReducer = (state = initalState, action: IAction) => {
  const copyState = [...state];

  const routeLoginPageIndex = copyState.findIndex((element:IRoute)=> element.path === "/login")
  const routeUserPageIndex = copyState.findIndex((element:IRoute)=> element.path === "/vacation/user")
  const routeAdminPageIndex = copyState.findIndex((element:IRoute)=> element.path === "/vacation/admin")

  switch (action.type) {

    case Action.LOGINPAGE:{
      copyState[routeLoginPageIndex].name ="Login";
      copyState[routeUserPageIndex].isVisibale =false;
      copyState[routeAdminPageIndex].isVisibale = false;
      break
    }

    case Action.HOMEPAGEUSER: {
      
        copyState[routeLoginPageIndex].name ="Log Out"
        copyState[routeUserPageIndex].isVisibale = true;
      break;
    }
    case Action.HOMEPAGEADMIN: {
  
        copyState[routeLoginPageIndex].name ="Log Out"
        copyState[routeAdminPageIndex].isVisibale = true;
      break;
    }
    
  }
  return copyState;
};
