import express from 'express';
import {
  getAllPrenez,
  getPrenezById,
  getUltimaPrenez,
  createPrenez,
  updatePrenez,
  deletePrenez
} from '../controllers/prenezController.js';

const router = express.Router();

router.get('/', getAllPrenez);
router.get('/:id', getPrenezById);
router.get('/:id_ganado/ultima', getUltimaPrenez);
router.post('/', createPrenez);
router.put('/:id', updatePrenez);
router.delete('/:id', deletePrenez);

export default router;