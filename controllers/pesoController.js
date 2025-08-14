import pool from '../config/db.js';

// Obtener todos los registros de peso
export const getAllPeso = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM peso');
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener peso:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Obtener todos los registros de peso por ID del ganado
export const getPesoById = async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM peso WHERE id_ganado = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({
        message: 'Pesos no encontrados'
      });
    }
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener pesos por ganado:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Crear un nuevo registro de pesos
export const createPeso = async (req, res) => {
  const {
    peso,
    fecha,
    id_ganado
  } = req.body;

  if (!peso || !fecha || !id_ganado) {
    return res.status(400).json({
      message: 'Faltan datos requeridos'
    });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO peso (peso, fecha, id_ganado) VALUES (?, ?, ?)',
      [peso, fecha, id_ganado]
    );
    
    res.status(201).json({
      message: 'Peso creado exitosamente',
      id_pesaje: result.insertId
    });
  } catch (err) {
    console.error('Error al crear peso:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Actualizar un registro de peso
export const updatePeso = async (req, res) => {
  const {
    id
  } = req.params;
  const {
    peso,
    fecha,
    id_ganado
  } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE peso SET peso = ?, fecha = ?, id_ganado = ? WHERE id_pesaje = ?',
      [peso, fecha, id_ganado, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Peso no encontrado para actualizar'
      });
    }
    res.json({
      message: 'Peso actualizado exitosamente'
    });
  } catch (err) {
    console.error('Error al actualizar peso:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};


// Eliminar un registro de peso

export const deletePeso = async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM peso WHERE id_pesaje = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Peso no encontrado para eliminar'
      });
    }
    res.json({
      message: 'Peso eliminado exitosamente'
    });
  } catch (err) {
    console.error('Error al eliminar peso:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};
