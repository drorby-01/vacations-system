import axios, { AxiosError } from "axios";
import React from "react";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";

interface IProp {
  vacation_id: number;
  follows:number
}

const EditAndDelete = (prop: IProp) => {
  
  return (
    <div>

      <p>follows {prop.follows} </p>
      <NavLink to={`/vacation/admin/edit/${prop.vacation_id}`}  > Edit </NavLink>
      <NavLink to={`/vacation/admin/delete/${prop.vacation_id}`} className="m-1">Delete</NavLink>
    </div>
  );
};

export default EditAndDelete;
