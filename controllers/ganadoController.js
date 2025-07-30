import pool from '../config/db.js';

// Obtener todos los registros de ganado
export const getAllGanado = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM ganado');
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener ganado:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Obtener un registro de ganado por ID
export const getGanadoById = async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM ganado WHERE id_ganado = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({
        message: 'Ganado no encontrado'
      });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error al obtener ganado por ID:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Crear un nuevo registro de ganado
export const createGanado = async (req, res) => {
  const {
    nombre,
    raza,
    sexo,
    fecha_nacimiento,
    origen,
    proposito,
    estado,
    descripcion
  } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO ganado (nombre, raza, sexo, fecha_nacimiento, origen, proposito, estado, descripcion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [nombre, raza, sexo, fecha_nacimiento, origen, proposito, estado, descripcion]
    );
    res.status(201).json({
      message: 'Ganado creado exitosamente',
      id_ganado: result.insertId
    });
  } catch (err) {
    console.error('Error al crear ganado:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Actualizar un registro de ganado
export const updateGanado = async (req, res) => {
  const {
    id
  } = req.params;
  const {
    nombre,
    raza,
    sexo,
    fecha_nacimiento,
    origen,
    proposito,
    estado,
    descripcion
  } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE ganado SET nombre = ?, raza = ?, sexo = ?, fecha_nacimiento = ?, origen = ?, proposito = ?, estado = ?, descripcion = ? WHERE id_ganado = ?',
      [nombre, raza, sexo, fecha_nacimiento, origen, proposito, estado, descripcion, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Ganado no encontrado para actualizar'
      });
    }
    res.json({
      message: 'Ganado actualizado exitosamente'
    });
  } catch (err) {
    console.error('Error al actualizar ganado:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Eliminar un registro de ganado
export const deleteGanado = async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM ganado WHERE id_ganado = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Ganado no encontrado para eliminar'
      });
    }
    res.json({
      message: 'Ganado eliminado exitosamente'
    });
  } catch (err) {
    console.error('Error al eliminar ganado:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};