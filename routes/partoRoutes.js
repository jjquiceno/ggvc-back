import express from 'express';
import {
  getAllParto,
  getPartosByGanado,
  createParto,
  updateParto,
  deleteParto
} from '../controllers/partoController.js';

const router = express.Router();

router.get('/', getAllParto);
router.get('/:id', getPartosByGanado);
router.post('/', createParto);
router.put('/:id', updateParto);
router.delete('/:id', deleteParto);

export default router;