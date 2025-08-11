import pool from '../config/db.js';
import bcrypt from 'bcrypt';
import {SALT_ROUNDS, SECRET_JWT_KEY } from '../config/config.js';
import jwt from 'jsonwebtoken';

// Obtener todos los registros de usuario
export const getAllUsuario = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios');
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener usuarios:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Obtener un registro de usuario por ID
export const getUsuario = async (req, res) => {
  const {
    user
  } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE usuario = ?', [user]);
    if (rows.length === 0) {
      return res.status(404).json({
        message: 'Usuario no encontrado'
      });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error al obtener Usuario:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Crear un nuevo registro de usuario (incluyendo empleado y persona)
export const createUsuario = async (req, res) => {
  const {
    dni, // dni de la tabla usuario y empleado
    nombre_empleado, // Nombre para la tabla empleado y usuario
    email_empleado, // Email para la tabla empleado
    telefono_empleado, // Telefono para la tabla empleado
    usuario, // Usuario para la tabla usuario
    contrasena, // contraseña para la tabla usuario
    rol // rol para la tabla usuario
  } = req.body;

  // Validación básica de campos requeridos
  if (!usuario || !dni || !nombre_empleado || !email_empleado || !telefono_empleado || !contrasena || !rol) {
    return res.status(400).json({
      message: 'Faltan campos requeridos para crear el empleado, la persona y el usuario.'
    });
  }

  let connection;
  try {
    connection = await pool.getConnection(); // Obtener una conexión del pool
    await connection.beginTransaction(); // Iniciar la transacción

    // Insertar los datos en la tabla empleado
    const [empleadoResult] = await connection.query(
      'INSERT INTO empleado (usuario, dni, nombre, email, telefono) VALUES (?, ?, ?, ?, ?)',
      [usuario, dni, nombre_empleado, email_empleado, telefono_empleado]
    );

    const id_empleado_generado = empleadoResult.insertId;
  

    // Insertar datos en la tabla usuario

    const hashPassword = await bcrypt.hash(contrasena, SALT_ROUNDS); // Hashear la contraseña

    const [usuarioResult] = await connection.query(
      'INSERT INTO usuarios (usuario, dni, nombre, contraseña, rol) VALUES (?, ?, ?, ?, ?)',
      [usuario, dni, nombre_empleado, hashPassword, rol]
    );

    await connection.commit(); // Confirmar la transacción

    res.status(201).json({
      message: 'Empleado y usuario creados exitosamente',
      empleadoId: id_empleado_generado,
      usuarioCreado: usuario
    });

  } catch (err) {
    if (connection) {
      await connection.rollback(); // Revertir la transacción en caso de error
    }
    console.error('Error al crear empleado y usuario:', err);

    // Verificación usuario ya existente
    const [usuarios] = await connection.query(
      'SELECT * FROM usuario WHERE usuario = ?',
      [usuario]
    );

    if (usuarios.length > 0) {
      return res.status(409).json({
        message: 'El nombre de usuario ya existe, por favor elige otro.'
      });
    }

    // Verificación id ya existente
    const [doc] = await connection.query(
      'SELECT * FROM usuario WHERE dni = ?',
      [dni]
    );

    if (doc.length > 0) {
      return res.status(409).json({
        message: 'El número de documento que ingresaste ya existe'
      });
    }

    res.status(500).json({
      message: 'Error interno del servidor al crear el usuario. Por favor, verifica los datos proporcionados.'
    });
  } finally {
    if (connection) {
      connection.release(); // Liberar la conexión de vuelta al pool
    }
  }
};

export const loginUsuario = async (req, res) => {
  const {
    usuario,
    contrasena
  } = req.body;

  // Validación básica de campos requeridos
  if (!usuario || !contrasena) {
    return res.status(400).json({
      message: 'Faltan campos requeridos para iniciar sesión.'
    });
  }

  try {
    // Obtener el usuario de la base de datos
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);

    
    if (rows.length === 0) {
      return res.status(404).json({
        message: 'Usuario no encontrado'
      });
    }

    const user = rows[0];

    const [rowsEmpleado] = await pool.query('SELECT * FROM empleado WHERE usuario = ?', [usuario]);

    if (rowsEmpleado.length === 0) {
      return res.status(404).json({
        message: 'Empleado no encontrado'
      });
    }

    const empleado = rowsEmpleado[0];

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(contrasena, user.contraseña);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Contraseña incorrecta'
      });
    }

    // Generar un token JWT
    const token = jwt.sign(
      { usuario: user.usuario, nombre: user.nombre, rol: user.rol, email: empleado.email },
      SECRET_JWT_KEY, // Clave secreta para firmar el token
      { expiresIn: '1d' } // 1 día de duración
    );


    // Si todo es correcto, devolver los detalles del usuario (sin la contraseña)
    const {
      contraseña,
      ...userWithoutPassword
    } = user;

    res.json({
      user: userWithoutPassword,
      token: token
    });

  } catch (err) {
    console.error('Error al iniciar sesión:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

export const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN"

  if (!token) return res.status(401).json({ message: 'Token requerido' });

  jwt.verify(token, SECRET_JWT_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    req.usuario = user;
    next();
  });
};


// Actualizar un registro de usuario
export const updateUser = async (req, res) => {
  const {
    user
  } = req.params;
  const {
    contrasena, // Solo permitimos actualizar la contraseña y el rol si es necesario
    rol
  } = req.body;

  // Si no se proporciona contraseña ni rol, no hay nada que actualizar para el usuario
  if (!contrasena && !rol) {
    return res.status(400).json({
      message: 'No se proporcionaron datos para actualizar el usuario (contraseña o rol).'
    });
  }

  let updateFields = [];
  let queryParams = [];

  if (contrasena) {
    updateFields.push('contraseña = ?');
    queryParams.push(contrasena);
  }
  if (rol) {
    updateFields.push('rol = ?');
    queryParams.push(rol);
  }

  queryParams.push(user); // El usuario para la cláusula WHERE

  try {
    const [result] = await pool.query(
      `UPDATE usuarios SET ${updateFields.join(', ')} WHERE usuario = ?`,
      queryParams
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Usuario no encontrado para actualizar'
      });
    }
    res.json({
      message: 'Usuario actualizado exitosamente'
    });
  } catch (err) {
    console.error('Error al actualizar usuario:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};


// Eliminar un registro de usuario (solo en la tabla usuarios)
export const deleteUser = async (req, res) => {
  const {
    user
  } = req.params;

  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();


    // 1. Eliminar el usuario
    const [resultUsuario] = await connection.query('DELETE FROM usuarios WHERE usuario = ?', [user]);
    if (resultUsuario.affectedRows === 0) {
      await connection.rollback();
      return res.status(404).json({
        message: 'Usuario no encontrado para eliminar'
      });
    }

    // 3. Eliminar el empleado asociado
    const [resultEmpleado] = await connection.query('DELETE FROM empleado WHERE usuario = ?', [user]);
    if (resultEmpleado.affectedRows === 0) {
      await connection.rollback();
      return res.status(404).json({
        message: 'Empleado asociado no encontrado para eliminar'
      });
    }

    await connection.commit();

    res.json({
      message: 'Usuario y empleado eliminados exitosamente'
    });

  } catch (err) {
    if (connection) {
      await connection.rollback();
    }
    console.error('Error al eliminar usuario, persona y empleado:', err);
    res.status(500).json({
      message: 'Error interno del servidor al eliminar el usuario.'
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};