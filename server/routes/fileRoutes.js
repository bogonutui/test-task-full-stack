import express from 'express';
import multer from 'multer';
import { uploadFile, getFileData } from '../controllers/fileController.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', authenticate, upload.single('file'), uploadFile);
router.get('/file-data', authenticate, getFileData);

export default router;
