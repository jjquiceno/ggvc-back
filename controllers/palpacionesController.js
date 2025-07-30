import pool from '../config/db.js';


// Terminar de cambiar datos de palpacionesController.js

// Obtener todos los registros de palpaciones
export const getAllPalpaciones = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM palpaciones');
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener palpacion:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Obtener un registro de palpaciones por ID
export const getPalpacionById = async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM palpaciones WHERE id_palpacion = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({
        message: 'Palpacion no encontrada'
      });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error al obtener palpacion por ID:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Crear un nuevo registro de palpacions
export const createPalpacion = async (req, res) => {
  const {
    fecha,
    id_ganado,
    hallazgo,
    observaciones,
    condicion_corporal,
    palpador,
    utero,
    ovario_izq,
    ovario_der,
  } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO palpaciones (fecha, id_ganado, hallazgo, observaciones, condicion_corporal, palpador, utero, ovario_izq, ovario_der) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [fecha, id_ganado, hallazgo, observaciones, condicion_corporal, palpador, utero, ovario_izq, ovario_der]
    );
    res.status(201).json({
      message: 'Palpacion creada exitosamente',
      id_palpacion: result.insertId
    });
  } catch (err) {
    console.error('Error al crear palpacion:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Actualizar un registro de palpacion
export const updatePalpacion = async (req, res) => {
  const {
    id
  } = req.params;
  const {
    fecha,
    id_ganado,
    hallazgo,
    observaciones,
    condicion_corporal,
    palpador,
    utero,
    ovario_izq,
    ovario_der
  } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE palpaciones SET fecha = ?, id_ganado = ?, hallazgo = ?, observaciones = ?, condicion_corporal = ?, palpador = ?, utero = ?, ovario_izq = ?, ovario_der = ? WHERE id_palpacion = ?',
      [fecha,
        id_ganado,
        hallazgo,
        observaciones,
        condicion_corporal,
        palpador,
        utero,
        ovario_izq,
        ovario_der, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Palpacion no encontrada para actualizar'
      });
    }
    res.json({
      message: 'Palpacion actualizada exitosamente'
    });
  } catch (err) {
    console.error('Error al actualizar palpacion:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};


// Eliminar un registro de palpaciones

export const deletePalpacion = async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM palpaciones WHERE id_palpacion = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Palpacion no encontrada para eliminar'
      });
    }
    res.json({
      message: 'Palpacion eliminada exitosamente'
    });
  } catch (err) {
    console.error('Error al eliminar palpacion:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};