import express from 'express';
import {
  getAllReq,
  getReqById,
  createReq,
  updateReq,
  deleteReq
} from '../controllers/requerimientosController.js';

const router = express.Router();

router.get('/', getAllReq);
router.get('/:id', getReqById);
router.post('/', createReq);
router.put('/:id', updateReq);
router.delete('/:id', deleteReq);

export default router;