import pool from '../config/db.js';

// Obtener todos los registros de descendencias
export const getAllDescendencias = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        d.id_descendencia,
        d.id_ganado,
        g.nombre AS nombre_ganado,
        d.id_madre,
        madre.nombre AS nombre_madre,
        d.id_padre,
        padre.nombre AS nombre_padre
      FROM descendencias d
      LEFT JOIN ganado g ON d.id_ganado = g.id_ganado
      LEFT JOIN ganado madre ON d.id_madre = madre.id_ganado
      LEFT JOIN ganado padre ON d.id_padre = padre.id_ganado
    `);

    res.json(rows);
  } catch (error) {
    console.error('Error al obtener descendencias:', error);
    res.status(500).json({ error: 'Error al obtener descendencias' });
  }
};

// Obtener un registro de descendencias por ID
export const getDescendenciasById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query(
      `
      SELECT
        d.id_descendencia,
        d.id_ganado,
        g.nombre AS nombre_ganado,
        d.id_madre,
        madre.nombre AS nombre_madre,
        d.id_padre,
        padre.nombre AS nombre_padre
      FROM descendencias d
      LEFT JOIN ganado g ON d.id_ganado = g.id_ganado
      LEFT JOIN ganado madre ON d.id_madre = madre.id_ganado
      LEFT JOIN ganado padre ON d.id_padre = padre.id_ganado
      WHERE d.id_ganado = ?
      `,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'No se encontró genealogía para ese animal' });
    }

    res.json(rows[0]); // Solo uno porque es por ID
  } catch (error) {
    console.error('Error al obtener descendencia por ID:', error);
    res.status(500).json({ error: 'Error al obtener descendencia' });
  }
};

// Buscar descendencia por id_ganado
export const getDescendenciaByGanado = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      'SELECT * FROM descendencias WHERE id_ganado = ?',
      [id]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: 'Descendencia no encontrada' });
    }

    res.json(result[0]);
  } catch (err) {
    console.error('Error al obtener descendencia:', err);
    res.status(500).json({ error: 'Error al obtener descendencia' });
  }
};

// Crear un nuevo registro de descendencias
export const createDescendencias = async (req, res) => {
  const { id_ganado, id_madre, id_padre } = req.body;

  try {
    const [result] = await pool.query(
      `INSERT INTO descendencias (id_ganado, id_madre, id_padre) VALUES (?, ?, ?)`,
      [id_ganado, id_madre || null, id_padre || null]
    );

    res.status(201).json({ message: 'Registro de descendencia creado correctamente', id: result.insertId });
  } catch (error) {
    console.error('Error al crear la descendencia:', error);
    res.status(500).json({ error: 'Error al crear la descendencia' });
  }
};

// Actualizar un registro de descendencias
export const updateDescendencias = async (req, res) => {
  const {
    id
  } = req.params;
  const {
    id_ganado, id_madre, id_padre
  } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE descendencias SET id_ganado = ?, id_madre = ?, id_padre = ? WHERE id_descendencia = ?',
      [id_ganado, id_madre || null, id_padre || null, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Genealogía no encontrada para actualizar'
      });
    }
    res.json({
      message: 'Descendencia actualizada exitosamente'
    });
  } catch (err) {
    console.error('Error al actualizar descendencia:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Actualizar un registro de descendencias por id_ganado
export const updateDescendenciasByGanado = async (req, res) => {
  const {
    id
  } = req.params;
  const { id_madre, id_padre } = req.body;

  try {
    // Verifica que haya al menos un campo para actualizar
    if (id_madre === undefined && id_padre === undefined) {
      return res.status(400).json({
        message: 'Debes enviar al menos id_madre o id_padre para actualizar.'
      });
    }

    // Construcción dinámica de la consulta
    const campos = [];
    const valores = [];

    if (id_madre !== undefined) {
      campos.push('id_madre = ?');
      valores.push(id_madre || null); // null si es undefined o 0
    }

    if (id_padre !== undefined) {
      campos.push('id_padre = ?');
      valores.push(id_padre || null);
    }

    valores.push(id); // para el WHERE

    const sql = `UPDATE descendencias SET ${campos.join(', ')} WHERE id_ganado = ?`;

    const [result] = await pool.query(sql, valores);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Descendencia no encontrada para actualizar'
      });
    }

    res.json({
      message: 'Descendencia actualizada exitosamente'
    });
  } catch (err) {
    console.error('Error al actualizar descendencia:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};


// Eliminar un registro de descendencias
export const deleteDescendencias = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM descendencias WHERE id_descendencia = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Descendencia no encontrada para eliminar' });
    }
    res.json({ message: 'Descendencia eliminada exitosamente' });
  } catch (err) {
    console.error('Error al eliminar descendencia:', err);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
