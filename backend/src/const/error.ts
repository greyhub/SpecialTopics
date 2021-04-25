enum ERR_CODE {
  //Http Error
  OK = 200,

  MULTIPLE_CHOICE = 300,
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  SEE_OTHER = 303,
  NOT_MODIFIED = 304,
  TEMPORARY_REDIRECT = 307,
  PERMANENT_REDIRECT = 308,

  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  LOCKED = 423,
  TWO_EARLY = 425,
  TWO_MANY_REQUESTS = 429,

  INTERNAL_SERVER_ERROR = 500,

  //Error in try catch (when use library)
  TYPEORM_ERROR = 600,

  //Business Error from 1000:
  //EmployeeModule
  EMPLOYEE_CREATE_ERROR = 1000,
  EMPLOYEE_EXIST = 1001,
  EMPLOYEE_INVALID_NAME = 1002,
  EMPLOYEE_INVALID_CCCD = 1003,
  EMPLOYEE_UPLOAD_AVA_ERROR = 1004,
  EMPLOYEE_INVALID_ADDRESS = 1005,
  EMPLOYEE_INVALID_POSITION = 1006,
  EMPLOYEE_INVALID_ROLE = 1007,
  EMPLOYEE_INVALID_PASSWORD = 1008,
  EMPLOYEE_INVALID_ACCOUNT = 1009,
  EMPLOYEE_INVALID_BIRTHDAY = 1010,
  EMPLOYEE_INVALID_JOIN_DATE = 1011,
  EMPLOYEE_INVALID_EXPIRE_DATE = 1012,
  EMPLOYEE_DELETE_ERROR = 1013,
  EMPLOYEE_GET_BY_ID_ERROR = 1014,
  EMPLOYEE_INVALID_ID = 1015,
  EMPLOYEE_UPDATE_ERROR = 1016,

  
  //Business Error from 2000,
  //ProductModule
  PRODUCT_CREATE_ERROR = 2000,
  PRODUCT_EXIST = 2001,
  PRODUCT_INVALID_NAME = 2002,
  PRODUCT_INVALID_PRICE = 2003,
  PRODUCT_INVALID_DESCRIPTION = 2004,
  PRODUCT_UPLOAD_PREVIEW_ERROR = 2005,
  PRODUCT_DELETE_ERROR = 2006,
  PRODUCT_GET_BY_ID_ERROR = 2007,
  PRODUCT_INVALID_ID = 2008,
  PRODUCT_UPDATE_ERROR = 2009,


  //OtherModule from 3000, 
  
  //OtherModule from 3000,
  ACCOUNT_INVALID_ACCOUNT = 3000,
  ACCOUNT_WRONG_PASSWORD = 3001,
  ACCOUNT_INVALID_TOKEN = 3002,
  ACCOUNT_SIGN_IN_ERROR = 3003,
  ACCOUNT_TOKEN_EXPIRED = 3004,
  ACCOUNT_NO_PERMISSION = 3005,
  ACCOUNT_SIGN_OUT_ERROR = 3006,

  //ProductModule
  ORDER_CREATE_ERROR = 4000,
  ORDER_EXIST = 4001,
  ORDER_INVALID_NOTE = 4002,
  ORDER_INVALID_MONEY = 4003,
  ORDER_INVALID_TABEL_CODE = 4004,
  ORDER_INVALID_EMPLOYEEID = 4005,
  ORDER_DELETE_ERROR = 4006,
  ORDER_GET_BY_ID_ERROR = 4007,
  ORDER_INVALID_ID = 4008,
  ORDER_UPDATE_ERROR = 4009,
  ORDER_INVALID_DATE = 4010,
 
}

export default ERR_CODE;