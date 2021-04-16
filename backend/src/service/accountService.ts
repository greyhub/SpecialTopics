import jwt from "jsonwebtoken"
import { QueryFailedError } from "typeorm/error";
import ERR_CODE from "../const/error";
import STATUS_CODE from "../const/status";
import env from "../env";
import CustomError from "../error/customError";
import logger from "../_base/log/logger4js";
import bcrypt from "bcrypt";
import accountDAO from "../dao/accountDAO";
import TokenDecoded from "../model/TokenDecoded";
import employeeService from "./employeeService";

class AccountService {
  private static _instance: AccountService
  private constructor() {
  }
  public static get Instance() {
      return this._instance || (this._instance = new this());
  }

  private genTokenByIdPassword(id: string, hashPassword: string) {
    return jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      data: new TokenDecoded(id, hashPassword)
    }, env.SECRECT_KEY);
  }
  private decodeToken(token: string) {
    try {
      // const decoded = jwt.verify(token, env.SECRECT_KEY)//, function(err, decoded) {
      return jwt.verify(token, env.SECRECT_KEY)
    } catch(err) {
      throw new CustomError(STATUS_CODE.UNAUTHORIZED, ERR_CODE.ACCOUNT_INVALID_TOKEN);
    }
  }
  private async comparePassword(password: string, hashPassword: string) {
    return await bcrypt.compare(password, hashPassword, function(err, result) {
      if (err) {
        throw err;
      }
      return result;
    });
  }

  public async verifyTokenAndGetEmployee(token: string) {
    try {
      const payload = this.decodeToken(token);
      // console.log(typeof payload);
      if (!payload) {
        throw new CustomError(STATUS_CODE.UNAUTHORIZED, ERR_CODE.ACCOUNT_INVALID_TOKEN);
      }
      const decoded = (<any>payload).data;
      const exp = (<any>payload).exp;

      const employee = await employeeService.getById(decoded.id);
      // logger.debug(JSON.stringify(employee));
      if (!employee) {
        throw new CustomError(STATUS_CODE.UNAUTHORIZED, ERR_CODE.ACCOUNT_INVALID_TOKEN);
      }
      const hashPassword = employee?.hashPassword;
      if (!hashPassword) {
        throw new CustomError(STATUS_CODE.INTERNAL_SERVER_ERROR, ERR_CODE.INTERNAL_SERVER_ERROR);
      }
      const isValidToken = this.comparePassword(decoded.hashPassword, hashPassword);
      if (!isValidToken) {
        throw new CustomError(STATUS_CODE.UNAUTHORIZED, ERR_CODE.ACCOUNT_INVALID_TOKEN);
      }

      return employee;
    }
    catch(e) {
      if (e instanceof QueryFailedError) {
        logger.debug(e);
        logger.debug("QueryFailedError");
      }
      if (e instanceof CustomError) {
        logger.debug('CustomError');
        throw e;
      }
      throw new CustomError(STATUS_CODE.UNAUTHORIZED, ERR_CODE.ACCOUNT_INVALID_TOKEN);
    }
  }
  public async hashPassword(password: string) {
    try {
      let salt = bcrypt.genSaltSync(10);
      password = await bcrypt.hash(password, salt);
      return password;
    }
    catch(e) {
      throw e;
    }
  }
  public async signIn(account: string, password: string) {
    try {
      // Kiem tra xem co tai khoan khong
      const employee = await accountDAO.getEmployeeByAccount(account);
      if (!employee) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.ACCOUNT_INVALID_ACCOUNT);
      }
      
      const isRightPassword = this.comparePassword(password, employee.hashPassword);
      if (!isRightPassword) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.ACCOUNT_WRONG_PASSWORD);
      }

      // Sinh token de tra ve
      const token = this.genTokenByIdPassword(employee.id, employee.hashPassword);
      return {
        token: token,
        employee: employee
      }
    }
    catch(e) {
      if (e instanceof QueryFailedError) {
        logger.debug(e);
        logger.debug("QueryFailedError");
      }
      if (e instanceof CustomError) {
        logger.debug('CustomError');
        throw e;
      }
      throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.ACCOUNT_SIGN_IN_ERROR);
    }
  }
}

export default AccountService.Instance