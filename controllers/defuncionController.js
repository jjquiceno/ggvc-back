import pool from '../config/db.js';

// Obtener todos los registros de defuncion
export const getAllDefuncion = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM defuncion_ganado');
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener defuncion:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Obtener un registro de defuncion por ID
export const getDefuncionById = async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM defuncion_ganado WHERE id_defuncion = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({
        message: 'Defuncion no encontrada'
      });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error al obtener defuncion por ID:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Crear un nuevo registro de ganado
export const createDefuncion = async (req, res) => {
  const {
    nombre,
    id_ganado,
    genero,
    fecha,
    lugar_de_defuncion
  } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO defuncion_ganado (nombre, id_ganado, genero, fecha, lugar_de_defuncion) VALUES (?, ?, ?, ?, ?)',
      [nombre, id_ganado, genero, fecha, lugar_de_defuncion]
    );

    res.status(201).json({
      message: 'Defunción creada exitosamente',
      id_defuncion: result.insertId,
    });

  } catch (err) {
    console.error('Error al crear defunción:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Actualizar un registro de Defuncion
export const updateDefuncion = async (req, res) => {
  const {
    id
  } = req.params;
  const {
    nombre,
    id_ganado,
    genero,
    fecha,
    lugar_de_defuncion
  } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE defuncion_ganado SET nombre = ?, id_ganado = ?, genero = ?, fecha = ?, lugar_de_defuncion = ? WHERE id_defuncion = ?',
      [nombre, id_ganado, genero, fecha, lugar_de_defuncion, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Defuncion no encontrada para actualizar'
      });
    }
    res.json({
      message: 'Defuncion actualizado exitosamente'
    });
  } catch (err) {
    console.error('Error al actualizar defuncion:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};


// Eliminar un registro de defuncion

export const deleteDefuncion = async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM defuncion_ganado WHERE id_defuncion = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Defuncion no encontrada para eliminar'
      });
    }
    res.json({
      message: 'Defuncion eliminada exitosamente'
    });
  } catch (err) {
    console.error('Error al eliminar defuncion:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};
