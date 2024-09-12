import express from 'express';
import { signup, login, randomPost } from '../controllers/userController.js';
import { saveUser } from '../middleware/userAuth.js';

const router = express.Router();

router.post('/signup', saveUser, signup);
router.post('/login', login);
router.post('/random', randomPost);

export default router;
