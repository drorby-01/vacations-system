import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import Alert from "../../Component/Alert/Alert";
import { linkAdmin } from "../../redux/RouterReducer/router.action";
import "./EditVacation.css";

const EditVacation = () => {
  const { id }: any = useParams(); // give me vacation id
  const [vacation, setVacationFields] = useState<IForm>();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<IForm>({ mode: "onBlur" });

  const [error, setError] = useState("");
  const history = useHistory();
  const dispatch = useDispatch()
  interface IForm {
    id: number;
    description: string;
    travelDate: string;
    returnDate: string;
    picture: string;
    price: string;
  }

  useEffect(() => {
    dispatch(linkAdmin())
    function getVaction() {
      axios
        .get(`http://localhost:3001/vacations/${id}`, {
          headers: { Authorization: sessionStorage.getItem("UserToken") },
        })
        .then((result) => {
          const { data } = result;
          const [vacation] = data;
          console.log(vacation);
          setVacationFields(vacation);
          setValue("description", vacation.description);
          setValue("travelDate", vacation.travelDate);
          setValue("returnDate", vacation.returnDate);
          setValue("picture", vacation.picture);
          setValue("price", vacation.price);
        })
        .catch((error: AxiosError) => console.log(error.response?.data));
    }
    getVaction();
  }, []);

  const submit = (data: IForm) => {
    console.log(data);
    data.id = id;
    axios
      .put("http://localhost:3001/vacations", data, {
        headers: { Authorization: sessionStorage.getItem("UserToken") },
      })
      .then((data) => {
        setError("");
        console.log(data);
        history.goBack();
      })
      .catch((error: AxiosError) => setError(error.response?.data.error));
  };

  return (
    <>
      {error && <Alert error={error} />}

      <form onSubmit={handleSubmit(submit)}>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          className="form-control"
          defaultValue={vacation?.description}
          {...register("description", { required: true })}
        />
        {errors.description && (
          <p className="error">you must enter a discription</p>
        )}
        <label htmlFor="travel_date">Travel Date:</label>
        <input
          type="date"
          defaultValue={vacation?.travelDate}
          className="form-control"
          {...register("travelDate", { required: true })}
        />
        {errors.travelDate && (
          <p className="error">you must enter travel date</p>
        )}
        <label htmlFor="returnDate">Return Date:</label>
        <input
          type="date"
          defaultValue={vacation?.returnDate}
          className="form-control"
          {...register("returnDate", { required: true })}
        />
        {errors.returnDate && (
          <p className="error">you must enter return date</p>
        )}
        <label htmlFor="picture">Picture:</label>
        <input
          type="url"
          className="form-control"
          defaultValue={vacation?.picture}
          {...register("picture", {
            required: true,
            pattern: new RegExp(/(https?:\/\/.*\.(?:png|jpg))/i),
          })}
        />
        {errors.picture && (
          <p className="error">you must upload image from the web</p>
        )}

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          defaultValue={vacation?.price}
          className="form-control"
          min="0"
          {...register("price", { required: true })}
        />
        {errors.price && <p className="error">you must enter a price</p>}
        <button type="submit" className="btn btn-primary m-2">
          Save
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
    </>
  );
};

export default EditVacation;
