import pool from '../config/db.js';

// Obtener todos los registros de cria
export const getAllCria = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM cria');
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener cria:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Obtener un registro de cria por ID
export const getCriaById = async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM cria WHERE id_cria = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({
        message: 'Cria no encontrada'
      });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error al obtener cria por ID:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Crear un nuevo registro de ganado
export const createCria = async (req, res) => {
  const {
    id_parto,
    fecha_nacimiento,
    sexo,
    peso_al_nacer,
    color
  } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO cria (id_parto, fecha_de_nacimiento, sexo, peso_al_nacer, color) VALUES (?, ?, ?, ?, ?)',
      [id_parto, fecha_nacimiento, sexo, peso_al_nacer, color]
    );
    res.status(201).json({
      message: 'Cria creada exitosamente',
      id_cria: result.insertId
    });
  } catch (err) {
    console.error('Error al crear cria:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Actualizar un registro de cria
export const updateCria = async (req, res) => {
  const {
    id
  } = req.params;
  const {
    id_parto,
    fecha_nacimiento,
    sexo,
    peso_al_nacer,
    color
  } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE cria SET id_parto = ?, fecha_de_nacimiento = ?, sexo = ?, peso_al_nacer = ?, color = ? WHERE id_cria = ?',
      [id_parto, fecha_nacimiento, sexo, peso_al_nacer, color, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Cria no encontrada para actualizar'
      });
    }
    res.json({
      message: 'Cria actualizado exitosamente'
    });
  } catch (err) {
    console.error('Error al actualizar cria:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};


// Eliminar un registro de cria

export const deleteCria = async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM cria WHERE id_cria = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Cria no encontrada para eliminar'
      });
    }
    res.json({
      message: 'Cria eliminada exitosamente'
    });
  } catch (err) {
    console.error('Error al eliminar cria:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};
