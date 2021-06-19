import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useDispatch } from "react-redux";
import { IVaction } from "../../interface/IVaction/IVavation";
import { linkAdmin } from "../../redux/RouterReducer/router.action";

const VacationGraphFollow = () => {

const [vacationsGraphState,setVacationsGraph] = useState({vacationsDestination:[],vacationsFollows:[]})
const dispatch = useDispatch()
useEffect(()=>{
  dispatch(linkAdmin())
    axios.get("http://localhost:3001/vacations", {
      headers: { Authorization: sessionStorage.getItem("UserToken") },
    }).then((result:any)=>{
        
        const vacations = result.data;
        const vacationsDestination = vacations.map((element:IVaction)=>{
          return element.destination 
        })
        const vacationsFollows = vacations.map((element:IVaction)=>{
          return element.numOfFollowers
        })
        setVacationsGraph({vacationsDestination,vacationsFollows})
    })}
,[])



const state = {
  labels: vacationsGraphState.vacationsDestination,
  datasets: [
    {
      label: 'Follow',
      backgroundColor: '#FFB6C1',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: vacationsGraphState.vacationsFollows
    }
  ]
}
  return (
    
    <Bar 
    type
      data={state}
      options={{
        title: {
          display: true,
          text: "Vacation Follow Graph",
          fontSize: 20,
        },
        legend: {
          display: true,
          position: "right",      
        },
      }}
    />
    
  );
 
};

export default VacationGraphFollow;
