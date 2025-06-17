import express from 'express';
import {
  getAllGanado,
  getGanadoById,
  createGanado,
  updateGanado,
  deleteGanado
} from '../controllers/ganadoController.js';

const router = express.Router();

router.get('/', getAllGanado);
router.get('/:id', getGanadoById);
router.post('/', createGanado);
router.put('/:id', updateGanado);
router.delete('/:id', deleteGanado);

export default router;