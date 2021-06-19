const userDao = require("../dao/users-dao");
const vicationDao = require("../dao/vacation-dao");
const bcrypt = require("bcrypt");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");

class Validate {
  static async validateRegistration(user) {
    await this.validateUser(user);

    const checkUserExsit = await userDao.getUserByUserName(user.userName);
    if (checkUserExsit.length > 0 && checkUserExsit !== null) {
      throw new ServerError(ErrorType.USER_NAME_ALREADY_EXIST);
    }
  }

  static EmptyString(value) {
    return value === "";
  }

  static async validateUser(user) {
    if (
      typeof user.userName === "undefined" ||
      this.EmptyString(user.userName)
    ) {
      throw new ServerError(ErrorType.BADREQUEST1);
    }
    if (
      typeof user.password === "undefined" ||
      this.EmptyString(user.password)
    ) {
      throw new ServerError(ErrorType.BADREQUEST2);
    }
    if (
      typeof user.firstName === "undefined" ||
      this.EmptyString(user.firstName)
    ) {
      throw new ServerError(ErrorType.BADREQUEST3);
    }
    if (
      typeof user.lastName === "undefined" ||
      this.EmptyString(user.lastName)
    ) {
      throw new ServerError(ErrorType.BADREQUEST4);
    }
    if (typeof user.admin === "undefined") {
      throw new ServerError(ErrorType.BADREQUEST5);
    }
    if (!this.validateUserNameIsEmail(user.userName)) {
      throw new ServerError(ErrorType.BADREQUEST6);
    }
    if (user.password.length < 8) {
      throw new ServerError(ErrorType.BADREQUEST7);
    }
    if (user.password.length > 12) {
      throw new ServerError(ErrorType.BADREQUEST8);
    }
  }

  static validateUserNameIsEmail(username) {
    const result = new RegExp(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    ).test(username);

    return result;
  }

  static async validateLogin(user) {
    if (
      typeof user.userName === "undefined" ||
      this.EmptyString(user.userName)
    ) {
      throw new ServerError(ErrorType.UNAUTHORIZED);
    }
    if (!this.validateUserNameIsEmail(user.userName)) {
      throw new ServerError(ErrorType.UNAUTHORIZED2);
    }
    if (
      typeof user.password === "undefined" ||
      this.EmptyString(user.password)
    ) {
      throw new ServerError(ErrorType.UNAUTHORIZED);
    }

    const checkUserExsit = await userDao.getUserByUserName(user.userName);

    if (checkUserExsit === null || checkUserExsit.length === 0) {
      throw new ServerError(ErrorType.UNAUTHORIZED3);
    } else {
      const [userResult] = checkUserExsit;
      const passwordCompare = bcrypt.compareSync(
        user.password,
        userResult.password
      );
      if (!passwordCompare) {
        throw new ServerError(ErrorType.UNAUTHORIZED4);
      }
    }
  }

  static validateVacation(vacation) {
    if (
      typeof vacation.description === "undefined" ||
      this.EmptyString(vacation.description)
    ) {
      throw new ServerError(ErrorType.BADREQUEST9);
    }
    if (
      typeof vacation.picture === "undefined" ||
      this.EmptyString(vacation.picture)
    ) {
      throw new ServerError(ErrorType.BADREQUEST11);
    }
    if (
      typeof vacation.travelDate === "undefined" ||
      this.EmptyString(vacation.travelDate)
    ) {
      throw new ServerError(ErrorType.BADREQUEST12);
    }
    if (
      typeof vacation.returnDate === "undefined" ||
      this.EmptyString(vacation.returnDate)
    ) {
      throw new ServerError(ErrorType.BADREQUEST13);
    }
    if (
      typeof vacation.price === "undefined" ||
      this.EmptyString(vacation.price)
    ) {
      throw new ServerError(ErrorType.BADREQUEST14);
    }
    const travelDate = new Date(vacation.travelDate).getTime();
    const returnDate = new Date(vacation.returnDate).getTime();
    const dateNow = new Date().getTime();

    if (travelDate < dateNow) {
      throw new ServerError(ErrorType.BADREQUEST20);
    }
    if (returnDate < dateNow) {
      throw new ServerError(ErrorType.BADREQUEST21);
    }
    if (travelDate > returnDate) {
      throw new ServerError(ErrorType.BADREQUEST24);
    }
    if (!this.checkPicture(vacation.picture)) {
      throw new ServerError(ErrorType.BADREQUEST22);
    }
  }

  static checkPicture(picture) {
    return new RegExp(/(https?:\/\/.*\.(?:png|jpg))/i).test(picture);
  }
}

module.exports = Validate;
