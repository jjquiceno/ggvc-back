import pool from '../config/db.js';

// Obtener todos los registros de nutrición
export const getAllNutricion = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM nuticion');
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener los registros de nutición:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Obtener un registro de nutrición por ID
export const getNutricionById = async (req, res) => {
  const {
    id
  } = req.params;
  try {
    // La clave primaria ahora es `fecha`
    const [rows] = await pool.query('SELECT * FROM nuticion WHERE fecha = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({
        message: 'Registro de nutición no encontrado'
      });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error al obtener el registro de nutición por fecha:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Crear un nuevo registro de nutrición
export const createNutricion = async (req, res) => {
  const {
    fecha,
    id_ganado,
    tipo_alimento,
    nombre_alimento,
    cantidad,
    observaciones,
    empleado
  } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO nuticion (fecha, id_ganado, tipo_alimento, nombre_alimento, cantidad, observaciones, empleado) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [fecha, id_ganado, tipo_alimento, nombre_alimento, cantidad, observaciones, empleado]
    );
    res.status(201).json({
      message: 'Registro de nutición creado exitosamente'
    });
  } catch (err) {
    console.error('Error al crear el registro de nutición:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Actualizar un registro de nutrición
export const updateNutricion = async (req, res) => {
  const {
    id
  } = req.params;
  const {
    id_ganado,
    tipo_alimento,
    nombre_alimento,
    cantidad,
    observaciones,
    empleado
  } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE nuticion SET id_ganado = ?, tipo_alimento = ?, nombre_alimento = ?, cantidad = ?, observaciones = ?, empleado = ? WHERE fecha = ?',
      [id_ganado, tipo_alimento, nombre_alimento, cantidad, observaciones, empleado, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Registro de nutición no encontrado para actualizar'
      });
    }
    res.json({
      message: 'Registro de nutición actualizado exitosamente'
    });
  } catch (err) {
    console.error('Error al actualizar el registro de nutición:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Eliminar un registro de nutrición
export const deleteNutricion = async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM nuticion WHERE fecha = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Registro de nutición no encontrado para eliminar'
      });
    }
    res.json({
      message: 'Registro de nutición eliminado exitosamente'
    });
  } catch (err) {
    console.error('Error al eliminar el registro de nutición:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};
