import pool from '../config/db.js';

// Obtener todos los registros de preñez
export const getAllPrenez = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM preñez');
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener preñez:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Obtener todos los registros de preñez por ID ganado
export const getPrenezById = async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM preñez WHERE id_ganado = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({
        message: 'Preñez no encontrada'
      });
    }
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener preñez por ID:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

export const getUltimaPrenez = async (req, res) => {
  const { id_ganado } = req.params;

  try {
    const [rows] = await pool.query(
      `SELECT * 
       FROM preñez 
       WHERE id_ganado = ? AND estado = 'activa'
       ORDER BY id_prenez DESC 
       LIMIT 1`,
      [id_ganado]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No hay preñez activa para este ganado' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error('Error al obtener última preñez:', err);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Crear un nuevo registro de prenez
export const createPrenez = async (req, res) => {
  const {
    id_ganado,
    fecha_monta,
    metodo,
    responsable,
    estado
  } = req.body;
  
  // Validar que los campos estén
  if (!id_ganado || !fecha_monta || !metodo || !responsable || !estado) {
    return res.status(400).json({
      message: 'Todos los campos son requeridos'
    });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO preñez (id_ganado, fecha_monta, metodo, responsable, estado) VALUES (?, ?, ?, ?, ?)',
      [id_ganado, fecha_monta, metodo, responsable, estado]
    );
    res.status(201).json({
      message: 'Preñez creada exitosamente',
      id_prenez: result.insertId
    });
  } catch (err) {
    console.error('Error al crear prenez:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Actualizar un registro de preñez
export const updatePrenez = async (req, res) => {
  const {
    id
  } = req.params;
  const {
    id_ganado,
    fecha_monta,
    metodo,
    responsable,
    estado
  } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE preñez SET id_ganado = ?, fecha_monta = ?, metodo = ?, responsable = ?, estado = ? WHERE id_prenez = ?',
      [id_ganado, fecha_monta, metodo, responsable, estado, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Preñez no encontrada para actualizar'
      });
    }
    res.json({
      message: 'Preñez actualizada exitosamente'
    });
  } catch (err) {
    console.error('Error al actualizar preñez:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};


// Eliminar un registro de prenez

export const deletePrenez = async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM preñez WHERE id_prenez = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Preñez no encontrada para eliminar'
      });
    }
    res.json({
      message: 'Preñez eliminada exitosamente'
    });
  } catch (err) {
    console.error('Error al eliminar preñez:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};
