import express from 'express';
import {
  getAllCria,
  getCriaById,
  createCria,
  updateCria,
  deleteCria
} from '../controllers/criaController.js';

const router = express.Router();

router.get('/', getAllCria);
router.get('/:id', getCriaById);
router.post('/', createCria);
router.put('/:id', updateCria);
router.delete('/:id', deleteCria);

export default router;