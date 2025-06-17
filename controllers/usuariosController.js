import pool from '../config/db.js';

// Obtener todos los registros de ganado
export const getAllUsuario = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM usuario');
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener usuario:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Obtener un registro de ganado por ID
export const getUsuario = async (req, res) => {
  const { user } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM usuario WHERE usuario = ?', [user]);
    if (rows.length === 0) {
      return res.status(404).json({
        message: 'Usuario no encontrado'
      });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error al obtener Usuario:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Crear un nuevo registro de ganado
export const createUsuario = async (req, res) => {
  const { user, password, rol } = req.body;

  // Validación básica
  if (!user || !password || !rol) {
    return res.status(400).json({ message: 'Faltan campos requeridos (usuario, contraseña o rol)' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO usuario (usuario, contraseña, rol) VALUES (?, ?, ?)',
      [user, password, rol]
    );

    res.status(201).json({
      message: 'Usuario creado exitosamente',
      userId: result.insertId
    });
  } catch (err) {
    console.error('Error al crear usuario:', err);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Actualizar un registro de ganado
export const updateUser = async (req, res) => {
  const {
    user
  } = req.params;
  const {
    usuario,
    password
  } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE usuario SET usuario = ?, contraseña = ? WHERE usuario = ?',
      [usuario, password, user]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'usuario no encontrado para actualizar'
      });
    }
    res.json({
      message: 'usuario actualizado exitosamente'
    });
  } catch (err) {
    console.error('Error al actualizar usuario:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Eliminar un registro de ganado
export const deleteUser = async (req, res) => {
  const {
    user
  } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM usuario WHERE usuario = ?', [user]);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'usuario no encontrado para eliminar'
      });
    }
    res.json({
      message: 'usuario eliminado exitosamente'
    });
  } catch (err) {
    console.error('Error al eliminar usuario:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};