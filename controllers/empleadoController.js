import pool from '../config/db.js';
import bcrypt from 'bcrypt'

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

// PATCH para actualizar empleado usando usuario
export const patchEmpleadoByUsuario = async (req, res) => {
  const { user } = req.params;
  const { nombre, email, telefono } = req.body;

  try {
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

export const patchEmpleadoYUsuario = async (req, res) => {
  const { id_empleado } = req.params;
  const {
    usuario,
    dni,
    nombre,
    email,
    telefono,
    contraseña,
    rol,
  } = req.body;

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // --- Obtener usuario actual ANTES de modificar empleado ---
    const [userRows] = await conn.query(
      "SELECT usuario FROM empleado WHERE id_empleado = ?",
      [id_empleado]
    );
    if (userRows.length === 0) {
      throw new Error("Empleado no encontrado");
    }
    const usuarioActual = userRows[0].usuario;

    // --- Actualizar empleado ---
    const empleadoFields = [];
    const empleadoValues = [];

    if (usuario) {
      empleadoFields.push("usuario = ?");
      empleadoValues.push(usuario);
    }
    if (dni) {
      empleadoFields.push("dni = ?");
      empleadoValues.push(dni);
    }
    if (nombre) {
      empleadoFields.push("nombre = ?");
      empleadoValues.push(nombre);
    }
    if (email) {
      empleadoFields.push("email = ?");
      empleadoValues.push(email);
    }
    if (telefono) {
      empleadoFields.push("telefono = ?");
      empleadoValues.push(telefono);
    }

    if (empleadoFields.length > 0) {
      empleadoValues.push(id_empleado);
      await conn.query(
        `UPDATE empleado SET ${empleadoFields.join(", ")} WHERE id_empleado = ?`,
        empleadoValues
      );
    }

    // --- Actualizar usuarios ---
    const usuarioFields = [];
    const usuarioValues = [];

    if (usuario) {
      usuarioFields.push("usuario = ?");
      usuarioValues.push(usuario);
    }
    if (dni) {
      usuarioFields.push("dni = ?");
      usuarioValues.push(dni);
    }
    if (nombre) {
      usuarioFields.push("nombre = ?");
      usuarioValues.push(nombre);
    }
    if (contraseña) {
      const hashedPassword = await bcrypt.hash(contraseña, 10);
      usuarioFields.push("contraseña = ?");
      usuarioValues.push(hashedPassword);
    }
    if (rol) {
      usuarioFields.push("rol = ?");
      usuarioValues.push(rol);
    }

    if (usuarioFields.length > 0) {
      usuarioValues.push(usuarioActual); // Usar el usuario original para el WHERE
      await conn.query(
        `UPDATE usuarios SET ${usuarioFields.join(", ")} WHERE usuario = ?`,
        usuarioValues
      );
    }

    await conn.commit();
    res.json({ message: "Empleado y usuario actualizados correctamente" });

  } catch (error) {
    await conn.rollback();
    console.error(error);
    res.status(500).json({ error: error.message });
  } finally {
    conn.release();
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