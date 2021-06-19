import axios from "axios";

const checkAuthorization = ()=>{
    //if i do a refresh i dont have access to myserver side at least the login and register page so i do a check 
    if(!axios.defaults.headers["Authorization"]){
        axios.defaults.headers["Authorization"] = localStorage.getItem("UserToken");
    }
}

export default checkAuthorization;