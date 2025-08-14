import express from 'express';
import {
  getAllPeso,
  getPesoById,
  createPeso,
  updatePeso,
  deletePeso
} from '../controllers/pesoController.js';

const router = express.Router();

router.get('/', getAllPeso);
router.get('/:id', getPesoById);
router.post('/', createPeso);
router.put('/:id', updatePeso);
router.delete('/:id', deletePeso);

export default router;