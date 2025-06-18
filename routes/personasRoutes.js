import express from 'express';
import {
  getAllPersonas,
  getPersona,
  createPersona,
  updatePersona,
  deletePersona,
} from '../controllers/personasController.js';

const router = express.Router();

router.get('/', getAllPersonas);
router.get('/:id', getPersona);
router.post('/', createPersona);
router.put('/:id', updatePersona);
router.delete('/:id', deletePersona);

export default router;