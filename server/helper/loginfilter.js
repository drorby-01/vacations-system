const expressJwt = require("express-jwt");
const config = require("../config.json");
const { secret } = config;
console.log(secret);
function authLogin() {
  /*will protect our app to access only for the users controller 
      if i want to go to the vactions controller i need to have the token  
    */
  return expressJwt({ secret, algorithms: ["HS256"] }).unless({
    path: [
      { url: "/users/", method: "POST" },
      { url: "/users/login", method: "POST" },
    ],
  });
}

module.exports = authLogin;
