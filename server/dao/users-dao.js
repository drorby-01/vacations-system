const dataBaseExecute = require("./connaction-wraper");
const crypt = require("bcrypt");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type")


async function getUserById(id) {
  const sql = `select * from user where id = ?`;
  const parameters = [id];
  try {
    const result = await dataBaseExecute.exceuteWithParameters(sql, parameters);
    return result;
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

async function getAllUsers() {
  const sql = "select * from user";
  try {
    return await dataBaseExecute.execute(sql);
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

async function getUserByUserName(username) {
  /*the login method because the username is uniqe and the password 
  is been crypt in out database i do the login method by the userName only*/
  const sql = `select * from user where user_name = ?`;
  const parameters = [username];
  try {
    const result = await dataBaseExecute.exceuteWithParameters(sql, parameters);
    return result;
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }

  // console.log(result);
}

async function insertUser(user) {
  const sql = `insert into user(first_name,last_name,user_name,password,is_admin) values(?,?,?,?,?)`;
  const parameters = [
    user.firstName,
    user.lastName,
    user.userName,
    crypt.hashSync(user.password, 10),
    JSON.parse(user.admin),
  ];
  try {
    const result = await dataBaseExecute.exceuteWithParameters(sql, parameters);
    return result;
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

async function deleteUser(id) {
  const sql = `delete from user as u where u.id=?`;
  const parameters = [id];
  try {
    return await dataBaseExecute.exceuteWithParameters(sql, parameters);
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

async function updateUser(user) {
  console.log(user);
  const sql = `update user as u set first_name = ?, last_name = ? ,user_name= ?, password=?, is_admin=? where u.id= ?`;
  const parameters = [
    user.firstName,
    user.lastName,
    user.userName,
    crypt.hashSync(user.password, 10),
    JSON.parse(user.admin),
    user.id,
  ];
  try {
    const result = await dataBaseExecute.exceuteWithParameters(sql, parameters);
    return result;
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

module.exports = {
  getAllUsers,
  getUserByUserName,
  insertUser,
  deleteUser,
  updateUser,
  getUserById,
};
