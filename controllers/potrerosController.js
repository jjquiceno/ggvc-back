import pool from '../config/db.js';

// Obtener todos los registros de potreros
export const getAllPotreros = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM potreros');
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener potrero:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Obtener un registro de potreros por ID
export const getPotrerosById = async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM potreros WHERE id_potrero = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({
        message: 'Potrero no encontrado'
      });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error al obtener potrero por ID:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Crear un nuevo registro de potreros
export const createPotrero = async (req, res) => {
  const {
    nombre_potrero
  } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO potreros (nombre_potrero) VALUES (?)',
      [nombre_potrero]
    );
    res.status(201).json({
      message: 'Potrero creado exitosamente',
      id_potrero: result.insertId
    });
  } catch (err) {
    console.error('Error al crear potrero:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Actualizar un registro de potrero
export const updatePotrero = async (req, res) => {
  const {
    id
  } = req.params;
  const {
    nombre_potrero
  } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE potreros SET nombre_potrero = ? WHERE id_potrero = ?',
      [nombre_potrero, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Potrero no encontrado para actualizar'
      });
    }
    res.json({
      message: 'Potrero actualizado exitosamente'
    });
  } catch (err) {
    console.error('Error al actualizar potrero:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};


// Eliminar un registro de potreros

export const deletePotrero = async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM potreros WHERE id_potrero = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Potrero no encontrado para eliminar'
      });
    }
    res.json({
      message: 'Potrero eliminado exitosamente'
    });
  } catch (err) {
    console.error('Error al eliminar potrero:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};
