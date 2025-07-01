import express from 'express';
import {
  getAllUsuario,
  getUsuario,
  createUsuario,
  updateUser,
  deleteUser,
  loginUsuario,
} from '../controllers/usuariosController.js';

const router = express.Router();

router.get('/', getAllUsuario);
router.get('/:user', getUsuario);
router.post('/register', createUsuario);
router.post('/login', loginUsuario);
router.put('/:user', updateUser);
router.delete('/:user', deleteUser);

export default router;