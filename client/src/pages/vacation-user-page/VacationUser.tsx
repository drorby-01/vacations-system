import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../Component/Card/Card";
import FollowsUser from "../../Component/FollowsUser/FollowsUser";

import { IVaction } from "../../interface/IVaction/IVavation";
import { linkUser } from "../../redux/RouterReducer/router.action";
import { getVacations } from "../../redux/vacationReducer/vacation.action";

const VacationUser = () => {
  
  const dispatch = useDispatch()

  useEffect(() => {
    getAllVacations();
    dispatch(linkUser())
  }, []);

  
  const {vacations} = useSelector((state:any) => state.vacationReducer)
  const getAllVacations = async () => {
    try {
      const result = await axios.get(
        `http://localhost:3001/vacations/`,
        { headers: { Authorization: sessionStorage.getItem("UserToken") } }
      );
      console.log(result.data);
      dispatch(getVacations(result.data));
    } catch (e) {console.log(e.message)}
  };
  
  return (
    <div className="container">
      <div className="row">
        {vacations.map((element: IVaction) => (
          <Card {...element} key={element.vacation_id + "vection"}>

            <FollowsUser
              user_id={element.user_id}
              numOfFollowers={element.numOfFollowers}
              vacation_id={element.vacation_id}
            />

          </Card>
        ))}
      </div>
    </div>
  );
};

export default VacationUser;
