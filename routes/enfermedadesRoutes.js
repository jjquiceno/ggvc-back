import express from 'express';
import {
  getAllEnfermedades,
  getEnfermedadesById,
  createEnfermedades,
  updateEnfermedades,
  deleteEnfermedades
} from '../controllers/enfermedadesController.js';

const router = express.Router();

router.get('/', getAllEnfermedades);
router.get('/:id', getEnfermedadesById);
router.post('/', createEnfermedades);
router.put('/:id', updateEnfermedades);
router.delete('/:id', deleteEnfermedades);

export default router;