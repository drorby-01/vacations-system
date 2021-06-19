const vacationDao = require("../dao/vacation-dao");
const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");
const Validator = require("../validation/validate");

async function getAllVacation(userId) {
  return await vacationDao.getAllVacations(userId);
}

async function getVacation(id) {
  return await vacationDao.getVacation(id);
}


async function editVacation(vacation,userIsAdmin){
  if(userIsAdmin === 1 ){
    Validator.validateVacation(vacation)
    return await vacationDao.updateVacaion(vacation)
  }else{
    throw new ServerError(ErrorType.BADREQUEST23)
  }
}

async function addFollow(vactionId, userId, userIsAdmin) {
  /// need to check if the user is not admin else throw error
  if (userIsAdmin === 0) {
    return await vacationDao.addFollow(vactionId, userId);
  } else {
    throw new ServerError(ErrorType.BADREQUEST15);
  }
}

async function removeFollow(vacationId, userId, userIsAdmin) {
  /// need to check if the user is not admin else throw error
  if (userIsAdmin === 0) {
    return await vacationDao.removeFollow(vacationId, userId);
  } else {
    throw new ServerError(ErrorType.BADREQUEST16);
  }
}

async function addVacation(vacation, userIsAdmin) {
  Validator.validateVacation(vacation)
  if (userIsAdmin === 1) {
    return await vacationDao.addVacation(vacation);
  } else {
    throw new ServerError(ErrorType.BADREQUEST17);
  }
}

async function deleteVacation(id, userIsAdmin) {
  if (userIsAdmin === 1) {
    return await vacationDao.deleteVacation(id);
  } else {
    throw new ServerError(ErrorType.BADREQUEST18);
  }
}

module.exports = {
  getAllVacation,
  getVacation,
  addFollow,
  editVacation,
  removeFollow,
  addVacation,
  deleteVacation,
};
