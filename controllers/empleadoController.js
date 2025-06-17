import pool from '../config/db.js';

// Obtener todos los empleados
export const getAllEmpleados = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM empleado');
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener empleados:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Obtener un empleado por ID
export const getEmpleadoById = async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM empleado WHERE id_empleado = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({
        message: 'Empleado no encontrado'
      });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error al obtener empleado por ID:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Crear un nuevo empleado
export const createEmpleado = async (req, res) => {
  const {
    id,
    nombre,
    email,
    telefono
  } = req.body; // Asegúrate de que 'id' se incluya si es una FK
  try {
    const [result] = await pool.query(
      'INSERT INTO empleado (id, nombre, email, telefono) VALUES (?, ?, ?, ?)',
      [id, nombre, email, telefono]
    );
    res.status(201).json({
      message: 'Empleado creado exitosamente',
      id_empleado: result.insertId
    });
  } catch (err) {
    console.error('Error al crear empleado:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Actualizar un empleado
export const updateEmpleado = async (req, res) => {
  const {
    id
  } = req.params;
  const {
    nombre,
    email,
    telefono
  } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE empleado SET nombre = ?, email = ?, telefono = ? WHERE id_empleado = ?',
      [nombre, email, telefono, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Empleado no encontrado para actualizar'
      });
    }
    res.json({
      message: 'Empleado actualizado exitosamente'
    });
  } catch (err) {
    console.error('Error al actualizar empleado:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Eliminar un empleado
export const deleteEmpleado = async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM empleado WHERE id_empleado = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Empleado no encontrado para eliminar'
      });
    }
    res.json({
      message: 'Empleado eliminado exitosamente'
    });
  } catch (err) {
    console.error('Error al eliminar empleado:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};