const dataBaseExecute = require("./connaction-wraper");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");

async function getAllVacations(userId) {
  let sql = `SELECT  v.id as vacation_id, v.destination, v.description, 
  v.picture, DATE_FORMAT(v.travel_date, '%d/%m/%Y') AS startDate, DATE_FORMAT(v.return_date,'%d/%m/%Y') AS endDate, 
  v.price,  followed_vacations.user_id, 
  
  (SELECT COUNT(*) FROM followed_vacations     
  WHERE vacation_id = v.id) AS numOfFollowers 
  
  FROM vacation v 
  
  LEFT JOIN followed_vacations  ON v.id=followed_vacations.vacation_id && followed_vacations.user_id=?
  ORDER BY  followed_vacations.user_id DESC`;
  
  try {
    const params = [userId];
    const result = await dataBaseExecute.exceuteWithParameters(sql, params);
    return result;
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

async function getVacation(id) {
  const sql = `select id,description,destination,picture,date_format(travel_date,"%Y-%m-%d") as travelDate,
  date_format(return_date,"%Y-%m-%d") as returnDate,
  price 
   from vacation where id = ? `;
  const parameters = [id];
  try {
    const result = await dataBaseExecute.exceuteWithParameters(sql, parameters);
    return result;
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

async function addFollow(vacationId, userId) {
  // i update the vecation follow by vacation id
  const sql = "insert into followed_vacations(user_id,vacation_id) values(?,?)";
  const parameters = [userId, vacationId];
  try {
    const result = await dataBaseExecute.exceuteWithParameters(sql, parameters);
    return result;
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

async function removeFollow(vacationId, userId) {
  const sql =
    "delete from followed_vacations where user_id = ? and vacation_id = ? ";
  const parameters = [userId, vacationId];
  try {
    const result = await dataBaseExecute.exceuteWithParameters(sql, parameters);
    return result;
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

async function addVacation(vacation) {
  const sql = `
  INSERT into vacation(description,destination,picture,travel_date,return_date,price) 
  values(?,?,?,?,?,?)`;
  const parameters = [
    vacation.description,
    vacation.destination,
    vacation.picture,
    vacation.travelDate,
    vacation.returnDate,
    vacation.price,
  ];
  try {
    const result = await dataBaseExecute.exceuteWithParameters(sql, parameters);
    return result;
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

async function updateVacaion(vacation){
  const sql = `update vacation set description=?,picture=?,travel_date=?,return_date=?,price=? where id = ?`
  const parameters =[vacation.description,vacation.picture,vacation.travelDate,vacation.returnDate,vacation.price,vacation.id]
  try{
    const result = await dataBaseExecute.exceuteWithParameters(sql,parameters)
    return result
  }catch(e){
    throw new ServerError(ErrorType.GENERAL_ERROR,sql,e)
  }
}

async function deleteVacation(id) {
  const sql = `delete from vacation where id=? `;
  const parameters = [id];
  try {
    const result = await dataBaseExecute.exceuteWithParameters(sql, parameters);
    return result;
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

module.exports = {
  getAllVacations,
  getVacation,
  addFollow,
  removeFollow,
  addVacation,
  updateVacaion,
  deleteVacation,
};
