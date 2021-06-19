import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Alert from "../../Component/Alert/Alert";
import { ILogin } from "../../interface/ILogin/ILogn";
import { linkAdmin, linkUser, loginPage } from "../../redux/RouterReducer/router.action";
import { userLogin } from "../../redux/userReducer/user.action";


const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>();

  const [serverError, setServerError] = useState<string>();
  
  const dispatch = useDispatch();
  const history = useHistory();

useEffect(()=>{
  dispatch(loginPage())
},[])   

  const submit = (data: ILogin) => {

    const oldtoken = sessionStorage.getItem("UserToken")

    axios
    .post("http://localhost:3001/users/login", data,{headers:{Authorization:oldtoken}})
    .then(({ data }) => {
      setServerError("");
      const token = "Bearer "+data.token;
      sessionStorage.setItem("UserToken", token);

      dispatch(userLogin({...data,token}));
      console.log(data)
      if(data.isAdmin === 0){ 
        dispatch(linkUser())

         history.push("/vacation/user")
      }
      else {
        dispatch(linkAdmin())
        history.push("/vacation/admin")
      }
    })
    .catch((e: AxiosError) => {
      setServerError(e.response?.data.error);
    });
  };

  return (
    <div className="container" >
      {serverError && <Alert error={serverError} />}
      <form
        onSubmit={handleSubmit(submit)}
        style={{ borderColor: "black", border: "2px solid black",margin:"20px"}}
      >
        <label htmlFor={"userName"}>UserName:</label>
        <input
          type="text"
          className="form-control w-auto "
          placeholder="Email"
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
        <label htmlFor={"password"}>Password:</label>
        <input
          type="password"
          className="form-control w-auto"
          placeholder="Password"
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
          <p style={{ color: "red" }}>your password is too long </p>
        )}
        <button className="btn btn-primary mt-2">Login</button>
      </form>
    </div>
  );
};

export default Login;
