import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Alert from "../../Component/Alert/Alert";
import { linkAdmin } from "../../redux/RouterReducer/router.action";

const AddVacation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const history = useHistory();
  const [alertMessage,setAlertMessage] = useState<string>("");
  const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(linkAdmin())
  },[])
  

  const submit = (data: IForm) => {
    axios
    .post("http://localhost:3001/vacations", data, {
      headers: { Authorization: sessionStorage.getItem("UserToken") },
    })
    .then((data) => {
      history.goBack();
    })
    .catch((e: AxiosError) => setAlertMessage(e.response?.data.error));
}
  
  interface IForm {
    description: string;
    destination: string;
    picture: string;
    travelDate: string;
    returnDate: string;
    price: number;
  }

  return (
    <div className="container">
    {alertMessage && <Alert error={alertMessage}/>}
    <form onSubmit={handleSubmit(submit)} className="container mt-2">
    
      <label htmlFor="description">Description</label>
      <input
        placeholder="Enter a discription"
        type="text"
        className="form-control"
        {...register("description", { required: true, minLength: 10 })}
      />
      {errors.description?.type === "required" && (
        <p className="error"> you must enter discription </p>
      )}

      {errors.description?.type === "minLength" && (
        <p className="error"> your discription is too short </p>
      )}

      <label htmlFor="destination">Destination</label>
      <input
        placeholder="Enter destination"
        type="text"
        className="form-control"
        {...register("destination", { required: true })}
      />
      {errors.destination?.type === "required" && (
        <p className="error"> you must enter discription </p>
      )}
      {errors.description?.message}
      <label htmlFor="picture">Picture</label>
      <input
        type="url"
        className="form-control"
        placeholder="Enter Picture url"
        {...register("picture", {
          required: true,
          pattern: new RegExp(
            /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/
          ),
        })}
      />
      {errors.picture && (
        <p className="error">the image must be from the website</p>
      )}

      <label htmlFor="travelDate">Travel Date</label>
      <input
        type="date"
        placeholder="Enter travel Date"
        className="form-control "
        {...register("travelDate", { required: true })}
      />
      {errors.travelDate && <p className="error">you must enter travel date</p>}

      <label htmlFor="returnDate">Return Date</label>
      <input
        type="date"
        placeholder="Enter return Date"
        className="form-control "
        {...register("returnDate", { required: true })}
      />

      {errors.returnDate && <p className="error">you must enter return date</p>}

      <label htmlFor="price">Price</label>
      <input
        type="number"
        placeholder="Enter Price"
        className="form-control "
        {...register("price", { required: true })}
      />
      {errors.returnDate && <p className="error">you must enter price</p>}
      <button type="submit" className="btn btn-primary m-2">
        Send
      </button>
      <button
        type="button"
        className="btn btn-warning m-2"
        onClick={() => {
          history.goBack();
        }}
      >
        Cancel
      </button>
    </form>
    </div>
  );
};

export default AddVacation;
