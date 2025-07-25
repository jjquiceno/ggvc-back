import pool from '../config/db.js';

// Obtener todos los registros de enfermedades
export const getAllEnfermedades = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM enfermedades');
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener Enfermedades:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Obtener un registro de Enfermedades por ID
export const getEnfermedadesById = async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM enfermedades WHERE id_diagnostico = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({
        message: 'Enfermedad no encontrada'
      });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error al obtener Enfermedad por ID:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Crear un nuevo registro de ganado
export const createEnfermedades = async (req, res) => {
  const {
    id_ganado,
    enfermedad,
    fecha_diagnostico,
    sintomas,
    tratamiento,
    estado_actual
  } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO enfermedades (id_ganado, enfermedad, fecha_diagnostico, sintomas, tratamiento, estado_actual) VALUES (?, ?, ?, ?, ?, ?)',
      [id_ganado, enfermedad, fecha_diagnostico, sintomas, tratamiento, estado_actual]
    );
    res.status(201).json({
      message: 'Enfermedad creada exitosamente',
      id_diagnostico: result.insertId
    });
  } catch (err) {
    console.error('Error al crear enfermedad:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Actualizar un registro de Enfermedades
export const updateEnfermedades = async (req, res) => {
  const {
    id
  } = req.params;
  const {
    id_ganado,
    enfermedad,
    fecha_diagnostico,
    sintomas,
    tratamiento,
    estado_actual
  } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE enfermedades SET id_ganado = ?, enfermedad = ?, fecha_diagnostico = ?, sintomas = ?, tratamiento = ?, estado_actual = ? WHERE id_diagnostico = ?',
      [id_ganado,
        enfermedad,
        fecha_diagnostico,
        sintomas,
        tratamiento,
        estado_actual, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Enfermedad no encontrada para actualizar'
      });
    }
    res.json({
      message: 'Enfermedad actualizada exitosamente'
    });
  } catch (err) {
    console.error('Error al actualizar Enfermedades:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};


// Eliminar un registro de Enfermedades

export const deleteEnfermedades = async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM enfermedades WHERE id_diagnostico = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Enfermedad no encontrada para eliminar'
      });
    }
    res.json({
      message: 'Enfermedad eliminada exitosamente'
    });
  } catch (err) {
    console.error('Error al eliminar Enfermedad:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};
