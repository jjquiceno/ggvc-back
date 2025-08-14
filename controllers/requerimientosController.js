import pool from '../config/db.js';

// Obtener todos los registros de req_BPG
export const getAllReq = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM req_BPG');
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener potrero:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Obtener un registro de req_BPG por ID
export const getReqById = async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM req_BPG WHERE id_req = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({
        message: 'Requerimiento no encontrado'
      });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error al obtener requerimiento por ID:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Crear un nuevo registro de req_BPG
export const createReq = async (req, res) => {
  const {
    id_empleado,
    fecha,
    req_cumplido,
    descripcion,
    estado
  } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO req_BPG (id_empleado, fecha, req_cumplido, descripcion, estado) VALUES (?, ?, ?, ?, ?)',
      [id_empleado, fecha, req_cumplido, descripcion, estado]
    );
    res.status(201).json({
      message: 'Requerimiento creado exitosamente',
      id_req: result.insertId
    });
  } catch (err) {
    console.error('Error al crear potrero:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Actualizar un registro de req_BPG
export const updateReq = async (req, res) => {
  const {
    id
  } = req.params;
  const {
    id_empleado,
    fecha,
    req_cumplido,
    descripcion,
    estado
  } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE req_BPG SET id_empleado = ?, fecha = ?, req_cumplido = ?, descripcion = ?, estado = ? WHERE id_req = ?',
      [id_empleado,
        fecha,
        req_cumplido,
        descripcion,
        estado, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Requerimiento no encontrado para actualizar'
      });
    }
    res.json({
      message: 'Requerimiento actualizado exitosamente'
    });
  } catch (err) {
    console.error('Error al actualizar requerimiento:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};


// Eliminar un registro de req_BPG

export const deleteReq = async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM req_BPG WHERE id_req = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Requerimiento no encontrado para eliminar'
      });
    }
    res.json({
      message: 'Requerimiento eliminado exitosamente'
    });
  } catch (err) {
    console.error('Error al eliminar requerimiento:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};
