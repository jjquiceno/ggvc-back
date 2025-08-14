import pool from '../config/db.js';

// Obtener todos los registros de nutrición
export const getAllNutricion = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM nutricion');
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener los registros de nutrición:', err);
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
    const [rows] = await pool.query('SELECT * FROM nutricion WHERE id_nutricion = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({
        message: 'Registro de nutrición no encontrado'
      });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error al obtener el registro de nutrición', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Crear un nuevo registro de nutrición
export const createNutricion = async (req, res) => {
  const {
    id_ganado,
    fecha,
    tipo_alimento,
    nombre_alimento,
    cantidad,
    observaciones,
    supervisor,
  } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO nutricion (id_ganado, fecha, tipo_alimento, nombre_alimento, cantidad, observaciones, supervisor) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [id_ganado, fecha, tipo_alimento, nombre_alimento, cantidad, observaciones, supervisor]
    );
    res.status(201).json({
      message: 'Registro de nutrición creado exitosamente',
      id_nutricion: result.insertId
    });
  } catch (err) {
    console.error('Error al crear el registro de nutrición:', err);
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
    fecha,
    tipo_alimento,
    nombre_alimento,
    cantidad,
    observaciones,
    supervisor
  } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE nutricion SET id_ganado = ?, fecha = ?, tipo_alimento = ?, nombre_alimento = ?, cantidad = ?, observaciones = ?, supervisor = ? WHERE id_nutricion = ?',
      [id_ganado, fecha, tipo_alimento, nombre_alimento, cantidad, observaciones, supervisor, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Registro de nutrición no encontrado para actualizar'
      });
    }
    res.json({
      message: 'Registro de nutrición actualizado exitosamente'
    });
  } catch (err) {
    console.error('Error al actualizar el registro de nutrición:', err);
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
    const [result] = await pool.query('DELETE FROM nutricion WHERE id_nutricion = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Registro de nutrición no encontrado para eliminar'
      });
    }
    res.json({
      message: 'Registro de nutrición eliminado exitosamente'
    });
  } catch (err) {
    console.error('Error al eliminar el registro de nutrición:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};
