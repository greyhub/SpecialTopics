import express, { Router } from 'express';
import cheatRoleMiddleware from '../cheat/cheatRoleMiddleware';
import accountController from '../controller/accountController';
import orderController from '../controller/orderController';
import authOrderMiddleware from '../middleware/authOrderMiddleware';



const router: Router = express.Router();

router.post('/v1/order/getbyimporterid',
  accountController.authTokenAndPassRoleCodeToResLocals,
  authOrderMiddleware("getById"),
  orderController.getByImporterId
)

router.get('/v1/order',
  accountController.authTokenAndPassRoleCodeToResLocals,
  authOrderMiddleware("getAll"),
  orderController.getAll
)

router.put('/v1/order/createone',
  accountController.authTokenAndPassRoleCodeToResLocals,
  authOrderMiddleware("create"),
  orderController.createOne
)

router.delete('/v1/order/delete',
  accountController.authTokenAndPassRoleCodeToResLocals,
  authOrderMiddleware("delete"),
  orderController.delete
)

router.put('/v1/order/update',
  accountController.authTokenAndPassRoleCodeToResLocals,
  authOrderMiddleware("update"),
  orderController.updateInfo
)

// /**
//  * CHEAT
//  */
// router.all('/v1/cheat/employee/createone',
//   cheatRoleMiddleware,
//   uploadDisk.single("avatar"),
//   employeeController.createOne
// )
// router.all('/v1/cheat/employee/update',
//   cheatRoleMiddleware,
//   uploadDisk.single("avatar"),
//   employeeController.updateInfo
// )

export default router;