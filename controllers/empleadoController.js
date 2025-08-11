import pool from '../config/db.js';

// Obtener todos los registros de empleado
export const getAllEmpleados = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM empleado');
    res.status(200).json(rows);
  } catch (err) {
    console.error('Error al obtener empleados:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Obtener un registro de empleado por ID
export const getEmpleado = async (req, res) => {
  const {
    id_empleado
  } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM empleado WHERE id_empleado = ?', [id_empleado]);
    if (rows.length === 0) {
      return res.status(404).json({
        message: 'Empleado no encontrado'
      });
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error('Error al obtener empleado:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Crear un nuevo registro de empleado
export const createEmpleado = async (req, res) => {
  const {
    nombre,
    email,
    telefono
  } = req.body;

  if (!nombre || !email || !telefono) {
    return res.status(400).json({
      message: 'Faltan campos requeridos para empleado (nombre, email, telefono)'
    });
  }
  try {
    const [result] = await pool.query(
      'INSERT INTO empleado (nombre, email, telefono) VALUES (?, ?, ?)',
      [nombre, email, telefono]
    );
    res.status(201).json({
      message: 'Empleado creado exitosamente',
      id_empleado: result.insertId,
    });
  } catch (err) {
    console.error('Error al crear empleado:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Actualizar un registro de empleado
export const updateEmpleado = async (req, res) => {
  const {
    id_empleado
  } = req.params;
  const {
    nombre,
    email,
    telefono
  } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE empleado SET nombre = ?, email = ?, telefono = ? WHERE id_empleado = ?',
      [nombre, email, telefono, id_empleado]
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

// PATCH para actualizar empleado usando usuario como FK
export const patchEmpleadoByUsuario = async (req, res) => {
  const { user } = req.params; // FK usuario
  const { nombre, email, telefono } = req.body;

  try {
    // Construimos el SET dinámicamente
    const campos = [];
    const valores = [];

    if (nombre !== undefined) {
      campos.push('nombre = ?');
      valores.push(nombre);
    }
    if (email !== undefined) {
      campos.push('email = ?');
      valores.push(email);
    }
    if (telefono !== undefined) {
      campos.push('telefono = ?');
      valores.push(telefono);
    }

    if (campos.length === 0) {
      return res.status(400).json({ message: 'No se enviaron campos para actualizar' });
    }

    // Agregamos el FK usuario al final para el WHERE
    valores.push(user);

    const [result] = await pool.query(
      `UPDATE empleado SET ${campos.join(', ')} WHERE usuario = ?`,
      valores
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Empleado no encontrado para actualizar' });
    }

    res.json({ message: 'Empleado actualizado exitosamente' });
  } catch (err) {
    console.error('Error al actualizar empleado:', err);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Eliminar un registro de empleado
export const deleteEmpleado = async (req, res) => {
  const {
    id_empleado
  } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM empleado WHERE id_empleado = ?', [id_empleado]);
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