import express from 'express';
import {
  getAllPotreros,
  getPotrerosById,
  createPotrero,
  updatePotrero,
  deletePotrero
} from '../controllers/potrerosController.js';

const router = express.Router();

router.get('/', getAllPotreros);
router.get('/:id', getPotrerosById);
router.post('/', createPotrero);
router.put('/:id', updatePotrero);
router.delete('/:id', deletePotrero);

export default router;