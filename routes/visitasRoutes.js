import express from 'express';
import {
  getAllVisitas,
  getVisitasByGanado,
  createVisitas,
  updateVisitas,
  deleteVisitas
} from '../controllers/visitasController.js';

const router = express.Router();

router.get('/', getAllVisitas);
router.get('/:id', getVisitasByGanado);
router.post('/', createVisitas);
router.put('/:id', updateVisitas);
router.delete('/:id', deleteVisitas);

export default router;