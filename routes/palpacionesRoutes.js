import express from 'express';
import {
    getAllPalpaciones,
    getPalpacionById,
    createPalpacion,
    updatePalpacion,
    deletePalpacion
} from '../controllers/palpacionesController.js';

const router = express.Router();

router.get('/', getAllPalpaciones);
router.get('/:id', getPalpacionById);
router.post('/', createPalpacion);
router.put('/:id', updatePalpacion);
router.delete('/:id', deletePalpacion);

export default router;