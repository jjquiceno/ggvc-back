import express from 'express';
import {
  getAllDescendencias,
  getDescendenciasById,
  createDescendencias,
  updateDescendencias,
  deleteDescendencias
} from '../controllers/descendenciasController.js';

const router = express.Router();

router.get('/', getAllDescendencias);
router.get('/:id', getDescendenciasById);
router.get('/ganado/:id', getDescendenciasById);
router.post('/', createDescendencias);
router.put('/:id', updateDescendencias);
router.delete('/:id', deleteDescendencias);

export default router;