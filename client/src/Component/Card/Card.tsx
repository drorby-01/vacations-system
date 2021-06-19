import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { IVaction } from "../../interface/IVaction/IVavation";
import "./Card.css";
const Card = (prop: IVaction) => {
  
  return (
      <div className="card col-lg-3 col-md-5 col-sm-12 col-12 p-2 m-1">
        
        <img
          src={prop.picture}
          className="card-img-top"
          alt="country image"
          height="300px"
          width="300px" 
        ></img>
        <div className="card-body">
          <h5 className="card-title">{prop.destination}</h5>
          <p className="card-text">{prop.description}</p>
          <p> price: {prop.price} $</p>
          <p>
            {prop.startDate} - {prop.endDate}
          </p>
          {prop.children}
        </div>
      </div>
    
  );
};

export default Card;
