import express from 'express';
import { sigin, signup } from '../controllers/posts';

const router = express.Router();

router.post('/signin', signin);
router.post('/signin', signup);

export default router;
