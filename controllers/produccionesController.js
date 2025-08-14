import pool from '../config/db.js';

// Obtener todos los registros de producciones
export const getAllProducciones = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM producciones');
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener produccion:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Obtener un registro de producciones por ID
export const getProduccionById = async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM producciones WHERE id_produccion = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({
        message: 'Produccion no encontrada'
      });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error al obtener produccion por ID:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Crear un nuevo registro de producciones
export const createProduccion = async (req, res) => {
  const {
    id_empleado,
    fecha,
    litros,
    descripcion
  } = req.body;
  
  // Validar que el campo nombre_potrero esté presente
  if (!id_empleado || !fecha || !litros || !descripcion) {
    return res.status(400).json({
      message: 'Faltan datos requeridos para crear la produccion'
    });
  }

  try {
    // Verificar si el empleado existe
    const [empleado] = await pool.query(
      'SELECT id_empleado FROM empleado WHERE id_empleado = ?',
      [id_empleado]
    );

    if (empleado.length === 0) {
      return res.status(404).json({
        message: `No existe un empleado con el id ${id_empleado}`
      });
    }
    
    const [result] = await pool.query(
      'INSERT INTO producciones (id_empleado, fecha, litros, descripcion) VALUES (?, ?, ?, ?)',
      [id_empleado, fecha, litros, descripcion]
    );
    res.status(201).json({
      message: 'Produccion creada exitosamente',
      id_produccion: result.insertId
    });
  } catch (err) {
    console.error('Error al crear produccion:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Actualizar un registro de producciones
export const updateProduccion = async (req, res) => {
  const {
    id
  } = req.params;
  const {
    id_empleado,
    fecha,
    litros,
    descripcion
  } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE producciones SET id_empleado = ?, fecha = ?, litros = ?, descripcion = ? WHERE id_produccion = ?',
      [id_empleado,
        fecha,
        litros,
        descripcion, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Produccion no encontrada para actualizar'
      });
    }
    res.json({
      message: 'Produccion actualizada exitosamente'
    });
  } catch (err) {
    console.error('Error al actualizar produccion:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};


// Eliminar un registro de producciones

export const deleteProduccion = async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM producciones WHERE id_produccion = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Produccion no encontrada para eliminar'
      });
    }
    res.json({
      message: 'Produccion eliminada exitosamente'
    });
  } catch (err) {
    console.error('Error al eliminar produccion:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};
