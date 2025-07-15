import express from 'express';
import {
  getAllDefuncion,
  getDefuncionById,
  createDefuncion,
  updateDefuncion,
  deleteDefuncion
} from '../controllers/defuncionController.js';

const router = express.Router();

router.get('/', getAllDefuncion);
router.get('/:id', getDefuncionById);
router.post('/', createDefuncion);
router.put('/:id', updateDefuncion);
router.delete('/:id', deleteDefuncion);

export default router;