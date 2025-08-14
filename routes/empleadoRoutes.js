import express from 'express';
import {
  getAllEmpleados,
  getEmpleado,
  createEmpleado,
  updateEmpleado,
  deleteEmpleado,
  patchEmpleadoByUsuario,
  patchEmpleadoYUsuario
} from '../controllers/empleadoController.js';

const router = express.Router();

router.get('/', getAllEmpleados);
router.get('/:id_empleado', getEmpleado);
router.post('/', createEmpleado);
router.put('/:id_empleado', updateEmpleado);
router.patch('/:user', patchEmpleadoByUsuario);
router.patch('/admin/:id_empleado', patchEmpleadoYUsuario);
router.delete('/:id_empleado', deleteEmpleado);

export default router;