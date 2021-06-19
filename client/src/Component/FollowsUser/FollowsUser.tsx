import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { IVaction } from "../../interface/IVaction/IVavation";
import { getVacations } from "../../redux/vacationReducer/vacation.action";

export interface IFollow {
  user_id: string | null;
  numOfFollowers: number;
  vacation_id: number;
}

function FollowsUser(prop: IFollow) {
  /*user_id give me feedback if the user alredy do follow or not
     if he did he can make unfollow else make follow   */
  const [followers, setFollowers] = useState({
    userfollow: prop.user_id,
    sumFollwers: prop.numOfFollowers,
  });
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  async function incrementFollow() {
    const { vacation_id } = prop;
    try {
      await axios.put(
        `http://localhost:3001/vacations/follow/${vacation_id}`,
        null,
        {
          headers: { Authorization: sessionStorage.getItem("UserToken") },
        }
      );

      axios
        .get(`http://localhost:3001/vacations`, {
          headers: { Authorization: sessionStorage.getItem("UserToken") },
        })
        .then((result) => {
          const numOfFollowers = getVacationFollow(result.data);
          dispatch(getVacations(result.data));

          setFollowers({
            userfollow: "1",
            sumFollwers: numOfFollowers,
          });
        });
    } catch (e) {
      console.log(e);
    }
  }

  function getVacationFollow(vacations: Array<IVaction>) {
    const vacation: IVaction = vacations.find(
      (vacation: IVaction) => vacation.vacation_id === prop.vacation_id
    ) as IVaction;
    return vacation.numOfFollowers;
  }

  async function dicrementFollow() {
    const { vacation_id } = prop;
    try {
      await axios.delete(
        `http://localhost:3001/vacations/follow/${vacation_id}`,
        {
          headers: { Authorization: sessionStorage.getItem("UserToken") },
        }
      );
      axios
        .get(`http://localhost:3001/vacations`, {
          headers: { Authorization: sessionStorage.getItem("UserToken") },
        })
        .then((result) => {
          const numOfFollowers = getVacationFollow(result.data);

          dispatch(getVacations(result.data));

          setFollowers({
            userfollow: null,
            sumFollwers: numOfFollowers,
          });
        });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <p>follows: {followers.sumFollwers}</p>
      {followers.userfollow === null && (
        <Link
          to={pathname}
          style={{ textDecorationLine: "underline", color: "#3C99DC" }}
          onClick={() => {
            incrementFollow();
          }}
        >
          follow
        </Link>
      )}

      {followers.userfollow !== null && (
        <Link
          to={pathname}
          style={{ textDecorationLine: "underline", color: "#3C99DC" }}
          onClick={() => {
            dicrementFollow();
          }}
        >
          unfollow
        </Link>
      )}
    </div>
  );
}

export default FollowsUser;
