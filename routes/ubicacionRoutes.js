import express from 'express';
import {
  getAllUbicacion,
  getUbicacionById,
  getPotreroByGanado,
  createUbicacion,
  updateUbicacion,
  deleteUbicacion
} from '../controllers/ubicacionController.js';

const router = express.Router();

router.get('/', getAllUbicacion);
router.get('/:id', getUbicacionById);
router.get('/potrero/:id', getPotreroByGanado);
router.post('/', createUbicacion);
router.put('/:id', updateUbicacion);
router.delete('/:id', deleteUbicacion);

export default router;