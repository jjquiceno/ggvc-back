import pool from '../config/db.js';

// Obtener todos los registros de parto
export const getAllParto = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM parto');
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener parto:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Obtener un registro de parto por ID Ganado
export const getPartosByGanado = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query(
      `SELECT p.id_parto, p.fecha_de_parto, p.metodo, p.problemas, p.resultado,
              pr.id_prenez, pr.id_ganado
       FROM parto p
       INNER JOIN preñez pr ON p.id_prenez = pr.id_prenez
       WHERE pr.id_ganado = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Este ganado no tiene partos registrados" });
    }

    res.json(rows);
  } catch (error) {
    console.error("Error al obtener partos:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Crear un nuevo registro de parto
export const createParto = async (req, res) => {
  const {
    id_prenez,
    fecha_de_parto,
    metodo,
    problemas,
    resultado
  } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO parto (id_prenez, fecha_de_parto, metodo, problemas, resultado) VALUES (?, ?, ?, ?, ?)',
      [id_prenez,
        fecha_de_parto,
        metodo,
        problemas,
        resultado]
    );
    res.status(201).json({
      message: 'Parto creado exitosamente',
      id_parto: result.insertId
    });
  } catch (err) {
    console.error('Error al crear parto:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

// Actualizar un registro de parto
export const updateParto = async (req, res) => {
  const {
    id
  } = req.params;
  const {
    id_prenez,
    fecha_de_parto,
    metodo,
    problemas,
    resultado
  } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE cria SET id_prenez = ?, fecha_de_parto = ?, metodo = ?, problemas = ?, resultado = ? WHERE id_cria = ?',
      [id_prenez,
        fecha_de_parto,
        metodo,
        problemas,
        resultado]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Parto no encontrado para actualizar'
      });
    }
    res.json({
      message: 'Parto actualizado exitosamente'
    });
  } catch (err) {
    console.error('Error al actualizar parto:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};


// Eliminar un registro de parto

export const deleteParto = async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM parto WHERE id_parto = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Parto no encontrado para eliminar'
      });
    }
    res.json({
      message: 'Parto eliminado exitosamente'
    });
  } catch (err) {
    console.error('Error al eliminar parto:', err);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};
