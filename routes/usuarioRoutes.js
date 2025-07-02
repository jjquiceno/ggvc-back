import express from 'express';
import {
  getAllUsuario,
  getUsuario,
  createUsuario,
  updateUser,
  deleteUser,
  loginUsuario,
  verificarToken,
} from '../controllers/usuariosController.js';

const router = express.Router();

router.get('/', getAllUsuario);
router.get('/:user', getUsuario);
router.post('/register', createUsuario);
router.post('/login', loginUsuario);
router.put('/:user', updateUser);
router.delete('/:user', deleteUser);

router.get('/protected', verificarToken, (req, res) => {
  res.json({ message: `Hola ${req.usuario.usuario}, accediste a la ruta protegida.` });
});

export default router;