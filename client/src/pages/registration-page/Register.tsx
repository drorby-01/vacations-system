import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import Alert from "../../Component/Alert/Alert";
import { IError } from "../../interface/IEror/IEror";
import { IRegister } from "../../interface/IRegister/IRegister";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>();

  const [serverError, setServerError] = useState<string>();
  const history = useHistory();
  
  

  const submit = (data: IRegister) => {
    data.admin = false;
    axios
    .post(`http://localhost:3001/users/`, data)
    .then(({ data }) => {
      console.log(data);
      setServerError("");

      history.push("/login");
    })
    .catch((e: AxiosError) => {
      setServerError(e.response?.data.error);
    });
  };

  return (
    <div className="container">
      {serverError && <Alert error={serverError} />}

      <form
        onSubmit={handleSubmit(submit)}
        style={{ borderColor: "black", border: "2px solid black" }}
      >
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          placeholder="First Name"
          className="form-control w-auto "
          {...register("firstName", { required: true })}
        />
        {errors.firstName && (
          <p style={{ color: "red" }}>you forgot insert your first name</p>
        )}

        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          placeholder="Last Name"
          className="form-control w-auto "
          {...register("lastName", { required: true })}
        />
        {errors.lastName && (
          <p style={{ color: "red" }}>you forgot insert your last name</p>
        )}

        <label htmlFor="userName">UserName:</label>
        <input
          type="email"
          placeholder="Email"
          className="form-control w-auto "
          {...register("userName", {
            required: true,
            pattern:
              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
          })}
        />
        {errors.userName?.type === "required" && (
          <p style={{ color: "red" }}>you forgot insert your userName</p>
        )}
        {errors.userName?.type === "pattern" && (
          <p style={{ color: "red" }}>userName must be type email</p>
        )}
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder="Password"
          className="form-control w-auto "
          {...register("password", {
            required: true,
            minLength: 8,
            maxLength: 12,
          })}
        />
        {errors.password?.type === "required" && (
          <p style={{ color: "red" }}>you forgot insert your password</p>
        )}
        {errors.password?.type === "minLength" && (
          <p style={{ color: "red" }}>your password is too short</p>
        )}
        {errors.password?.type === "maxLength" && (
          <p style={{ color: "red" }}>your password is too long</p>
        )}
        <button type="submit" className="btn btn-primary mt-2">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
