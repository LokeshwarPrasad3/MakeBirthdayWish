import { Router } from 'express';
import {
  deleteAllUsers,
  featchUserDetails,
  getAllUsers,
  makeBirthdayWish,
} from '../controllers/user.controllers.js';
const router = Router();

router.route('/make-birthday-wish').post(makeBirthdayWish);
router.route('/get-all-birthday').get(getAllUsers);
router.route('/:birthdayId').get(featchUserDetails);

// router.route('/delete-all-users').delete(deleteAllUsers);

export default router;
