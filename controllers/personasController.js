import pool from '../config/db.js';

// Obtener todos los registros de persona
export const getAllPersonas = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM persona');
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener personas:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Obtener un registro de persona por ID
export const getPersona = async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM persona WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({
        message: 'Persona no encontrada'
      });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error al obtener persona:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Crear un nuevo registro de persona
export const createPersona = async (req, res) => {
  const {
    id,
    usuario,
    nombre,
    correo_electronico
  } = req.body;
  if (!id || !usuario || !nombre || !correo_electronico) {
    return res.status(400).json({
      message: 'Faltan campos requeridos para persona (id, usuario, nombre, correo_electronico)'
    });
  }
  try {
    const [result] = await pool.query(
      'INSERT INTO persona (id, usuario, nombre, correo_electronico) VALUES (?, ?, ?, ?)',
      [id, usuario, nombre, correo_electronico]
    );
    res.status(201).json({
      message: 'Persona creada exitosamente',
      personaId: id // El ID es proporcionado por el cliente en este caso
    });
  } catch (err) {
    console.error('Error al crear persona:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Actualizar un registro de persona
export const updatePersona = async (req, res) => {
  const {
    id
  } = req.params;
  const {
    usuario,
    nombre,
    correo_electronico
  } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE persona SET usuario = ?, nombre = ?, correo_electronico = ? WHERE id = ?',
      [usuario, nombre, correo_electronico, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Persona no encontrada para actualizar'
      });
    }
    res.json({
      message: 'Persona actualizada exitosamente'
    });
  } catch (err) {
    console.error('Error al actualizar persona:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Eliminar un registro de persona
export const deletePersona = async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM persona WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Persona no encontrada para eliminar'
      });
    }
    res.json({
      message: 'Persona eliminada exitosamente'
    });
  } catch (err) {
    console.error('Error al eliminar persona:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};