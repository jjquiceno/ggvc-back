import express from 'express';
import {
    getAllSanidad,
    getSanidadById,
    getSanidadByGanadoId,
    createSanidad,
    updateSanidad,
    deleteSanidad
} from '../controllers/sanitarioController.js';

const router = express.Router();

router.get('/', getAllSanidad);
router.get('/:id', getSanidadById);
router.get('/ganado/:id', getSanidadByGanadoId);
router.post('/', createSanidad);
router.put('/:id', updateSanidad);
router.delete('/:id', deleteSanidad);

export default router;