import express from 'express';
import {
  getAllEmpleados,
  getEmpleado,
  createEmpleado,
  updateEmpleado,
  deleteEmpleado,
} from '../controllers/empleadosController.js';

const router = express.Router();

router.get('/', getAllEmpleados);
router.get('/:id_empleado', getEmpleado);
router.post('/', createEmpleado);
router.put('/:id_empleado', updateEmpleado);
router.delete('/:id_empleado', deleteEmpleado);

export default router;