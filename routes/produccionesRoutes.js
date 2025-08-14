import express from 'express';
import {
    getAllProducciones,
    getProduccionById,
    createProduccion,
    updateProduccion,
    deleteProduccion
} from '../controllers/produccionesController.js';

const router = express.Router();

router.get('/', getAllProducciones);
router.get('/:id', getProduccionById);
router.post('/', createProduccion);
router.put('/:id', updateProduccion);
router.delete('/:id', deleteProduccion);

export default router;