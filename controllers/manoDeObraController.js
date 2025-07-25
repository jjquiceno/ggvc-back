import pool from '../config/db.js';

// Obtener todos los registros de mano_de_obra
export const getAllObra = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM mano_de_obra');
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener Obra:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Obtener un registro de mano_de_obra por ID
export const getObraById = async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM mano_de_obra WHERE id_obra = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({
        message: 'Mano de obra no encontrada'
      });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error al obtener Mano de obra por ID:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Crear un nuevo registro de ganado
export const createManoDeObra = async (req, res) => {
  const {
    fecha ,
    id_empleado,
    tipo,
    actividad,
    duracion
  } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO mano_de_obra (fecha, id_empleado, tipo, actividad, duracion) VALUES (?, ?, ?, ?, ?)',
      [fecha ,
        id_empleado,
        tipo,
        actividad,
        duracion]
    );
    res.status(201).json({
      message: 'Mano de obra creada exitosamente',
      id_obra: result.insertId
    });
  } catch (err) {
    console.error('Error al crear mano de obra:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Actualizar un registro de mano_de_obra
export const updateManoDeObra = async (req, res) => {
  const {
    id
  } = req.params;
  const {
    fecha ,
    id_empleado,
    tipo,
    actividad,
    duracion
  } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE mano_de_obra SET fecha = ?, id_empleado = ?, tipo = ?, actividad = ?, duracion = ? WHERE id_obra = ?',
      [fecha,
        id_empleado,
        tipo,
        actividad,
        duracion,
        id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Mano de obra no encontrada para actualizar'
      });
    }
    res.json({
      message: 'Mano de obra actualizada exitosamente'
    });
  } catch (err) {
    console.error('Error al actualizar Mano de obra:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};


// Eliminar un registro de mano_de_obra
export const deleteManoDeObra = async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM mano_de_obra WHERE id_obra = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Mano de obra no encontrada para eliminar'
      });
    }
    res.json({
      message: 'Mano de obra eliminada exitosamente'
    });
  } catch (err) {
    console.error('Error al eliminar Mano de obra:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};  
