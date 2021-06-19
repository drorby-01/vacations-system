const usersDao = require("../dao/users-dao");
const Validator = require('../validation/validate')
const jwt = require("jsonwebtoken");
const config = require("../config.json");
const chaceModule = require("./cache-module")


const RIGHT_SALT = "ksdjfhbAWEDCAS29!@$addlkmn";
const LEFT_SALT = "32577098ASFKJkjsdhfk#$dc";

async function getAllUsers() {
  return await usersDao.getAllUsers();
}

async function register(user) {

  await Validator.validateRegistration(user);  
  await usersDao.insertUser(user);
  return { message: "The user successfully created" };
}

async function login(user) {
  await Validator.validateLogin(user);

  const [userData] = await usersDao.getUserByUserName(user.userName);
  let saltedUserName = LEFT_SALT + user.username + RIGHT_SALT;
  const jwtToken = jwt.sign({ sub: saltedUserName }, config.secret);
  chaceModule.set(jwtToken,userData);
  let successfullLoginResponse = { token: jwtToken,isAdmin:userData["is_admin"],userId:userData['id']};

  return successfullLoginResponse; 
}

async function insertUser(user) {
  return await usersDao.InsertUser(user);
}

async function deleteUser(id) {
  return await usersDao.deleteUser(id);
}

async function updateUser(user) {
  await Validator.validateUser(user)
  return await usersDao.updateUser(user);
}

async function getUserById(id){
    return await usersDao.getUserById(id)
}
module.exports = {
  getUserById,
  getAllUsers,
  register,
  login,
  insertUser,
  deleteUser,
  updateUser,
};
