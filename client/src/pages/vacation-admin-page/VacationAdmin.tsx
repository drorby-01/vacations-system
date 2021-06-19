import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import AdminNav from "../../Component/AdminNav/AdminNav";
import Card from "../../Component/Card/Card";
import EditAndDelete from "../../Component/EditAndDelete/EditAndDelete";
import { IVaction } from "../../interface/IVaction/IVavation";
import { linkAdmin } from "../../redux/RouterReducer/router.action";


const VacationAdmin = () => {

    const [data,setData] = useState<Array<IVaction>>([])
    const dispatch = useDispatch()
  useEffect(() => {
    dispatch(linkAdmin())
    const getAllVactions = async () => {
      axios.get("http://localhost:3001/vacations", {
        headers: { Authorization: sessionStorage.getItem("UserToken") },
      }).then((result)=>{
          console.log(result.data)
          setData(result.data)
      }).catch((e:AxiosError)=>console.log(e.response?.data))
    };
    getAllVactions()
  }, []);

  return <div className="container">
    <AdminNav/>
      <div className="row">
      {
         data.map((element:IVaction)=>{
             return  <Card {...element} key={"vacation"+element.vacation_id}>
                 <EditAndDelete vacation_id={element.vacation_id} follows={element.numOfFollowers}></EditAndDelete>
             </Card>
          })
      }
      </div>
  </div>;
};

export default VacationAdmin;
