import { Router } from 'express';
import { protectRoute, authorizeRoles } from '../middlewares/auth.middleware';
import { collectYearlyFund } from '../controllers/fund.controller';
import { issueNewLoan, submitLoanPayment } from '../controllers/loan.controller';
import { registerKutumbhaBharosha } from '../controllers/kb.controller';

const router = Router();

router.post('/funds/collect', protectRoute, authorizeRoles('Admin'), collectYearlyFund);
router.post('/loans/issue', protectRoute, authorizeRoles('Admin'), issueNewLoan);
router.post('/loans/repay', protectRoute, authorizeRoles('Admin'), submitLoanPayment);
router.post('/kb/register', protectRoute, authorizeRoles('Admin'), registerKutumbhaBharosha);

export default router;
