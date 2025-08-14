import express from 'express';
import {
  getAllNutricion,
  getNutricionById,
  createNutricion,
  updateNutricion,
  deleteNutricion
} from '../controllers/nuticionController.js';

const router = express.Router();

// Rutas para los registros de nutrición
router.get('/', getAllNutricion);
router.get('/:id', getNutricionById);
router.post('/', createNutricion);
router.put('/:id', updateNutricion);
router.delete('/:id', deleteNutricion);

export default router;
