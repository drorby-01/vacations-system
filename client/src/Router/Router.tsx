import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { IRoute } from "../interface/IRoute/IRoute";

const Router = () => {

  const routerData = useSelector((state:any)=>state.routerReducer)


  return (
    <div>
      <Switch>
        {routerData.map((element: IRoute, index:number) => {
          const { path, component, exact } = element;
          return (
            <Route key={"route"+index} path={path} component={component} exact={exact}/>
          );
        })}
        <Redirect from="/" to="/login"/>
      </Switch>
    </div>
  );
};

export default Router;
