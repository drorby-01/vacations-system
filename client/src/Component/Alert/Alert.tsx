import React from "react";
import { IError } from "../../interface/IEror/IEror";



const Alert = (prop: IError) => {
  return <div className="alert alert-danger">{prop.error}</div>;
};

export default Alert;
