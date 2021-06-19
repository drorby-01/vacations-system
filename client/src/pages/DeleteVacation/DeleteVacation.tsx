import axios, { AxiosError } from "axios";
import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
const DeleteVacation = () => {

  const { id }: any = useParams();
  const history = useHistory()
  useEffect(() => {
    axios.delete(`http://localhost:3001/vacations/${id}`, {
      headers: { Authorization: sessionStorage.getItem("UserToken") }
    }).then((data)=>{
        console.log(data.data);
        setTimeout(()=>{
            history.goBack()    
        },3000)
    }).catch((e:AxiosError)=>console.log(e.response?.data))
  }, []);


  return <div style={{position:"absolute",top:"40%",left:"50%"}}>  
    <Spinner animation="border"></Spinner>
  </div>;
};

export default DeleteVacation;
