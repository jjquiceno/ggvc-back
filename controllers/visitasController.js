import pool from '../config/db.js';

// Obtener todos los registros de visitas
export const getAllVisitas = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM visitas_medicas');
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener visitas:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Obtener un registro de visitas_medicas por id_ganado
export const getVisitasByGanado = async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM visitas_medicas WHERE id_ganado = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({
        message: 'Visitas no encontradas para ese ganado'
      });
    }
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener visitas por ID:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Crear un nuevo registro de visitas_medicas
export const createVisitas = async (req, res) => {
  const {
    id_ganado,
    fecha_visita,
    motivo,
    sintomas,
    diagnostico,
    tratamiento,
    prox_visita
  } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO visitas_medicas (id_ganado, fecha_visita, motivo, sintomas, diagnostico, tratamiento, prox_visita) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [id_ganado, fecha_visita, motivo, sintomas, diagnostico, tratamiento, prox_visita]
    );
    res.status(201).json({
      message: 'Visita medica creada exitosamente',
      id_visita: result.insertId
    });
  } catch (err) {
    console.error('Error al crear visita:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Actualizar un registro de visitas_medicas
export const updateVisitas = async (req, res) => {
  const {
    id_ganado,
    fecha_visita,
    motivo,
    sintomas,
    diagnostico,
    tratamiento,
    prox_visita
  } = req.body;
  const { id } = req.params;
  try {

    const [ganadoRows] = await pool.query(
      'SELECT id_ganado FROM ganado WHERE id_ganado = ?',
      [id_ganado]
    );

    if (ganadoRows.length === 0) {
      return res.status(400).json({
        message: `No existe ningún animal con id_ganado = ${id_ganado}`
      });
    }
    
    const [result] = await pool.query(
      'UPDATE visitas_medicas SET id_ganado = ?, fecha_visita = ?, motivo = ?, sintomas = ?, diagnostico = ?, tratamiento = ?, prox_visita = ? WHERE id_visita = ?',
      [id_ganado,
        fecha_visita,
        motivo,
        sintomas,
        diagnostico,
        tratamiento,
        prox_visita, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Visita no encontrada para actualizar'
      });
    }
    res.json({
      message: 'Visita actualizada exitosamente'
    });
  } catch (err) {
    console.error('Error al actualizar visita:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};


// Eliminar un registro de visitas_medicas

export const deleteVisitas = async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM visitas_medicas WHERE id_visita = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Visita no encontrada para eliminar'
      });
    }
    res.json({
      message: 'Visita eliminada exitosamente'
    });
  } catch (err) {
    console.error('Error al eliminar visita:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};
