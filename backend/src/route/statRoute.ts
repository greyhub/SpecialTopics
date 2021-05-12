import express, { Router } from 'express';
import accountController from '../controller/accountController';
import statController from '../controller/statController';

const router: Router = express.Router();

router.post('/v1/stat/revenue',
  accountController.authTokenAndPassRoleCodeToResLocals,
  statController.viewRevenue
)

router.post('/v1/stat/revenue/product',
  accountController.authTokenAndPassRoleCodeToResLocals,
  statController.viewRevenueProduct
)

export default router;