import express from 'express';
import {
  getAllDescendencias,
  getDescendenciasById,
  createDescendencias,
  updateDescendencias,
  updateDescendenciasByGanado,
  deleteDescendencias
} from '../controllers/descendenciasController.js';

const router = express.Router();

router.get('/', getAllDescendencias);
router.get('/ganado/:id', getDescendenciasById);
router.post('/', createDescendencias);
router.put('/:id', updateDescendencias);
router.patch('/ganado/:id', updateDescendenciasByGanado);
router.delete('/:id', deleteDescendencias);

export default router;