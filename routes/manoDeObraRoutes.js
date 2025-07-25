import express from 'express';
import {
  getAllObra,
  getObraById,
  createManoDeObra,
  updateManoDeObra,
  deleteManoDeObra

} from '../controllers/manoDeObraController.js';

const router = express.Router();

router.get('/', getAllObra);
router.get('/:id', getObraById);
router.post('/', createManoDeObra);
router.put('/:id', updateManoDeObra);
router.delete('/:id', deleteManoDeObra);

export default router;