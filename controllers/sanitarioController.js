import pool from '../config/db.js';

// Obtener todos los registros de plan_sanitario
export const getAllSanidad = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM plan_sanitario');
        res.json(rows);
    } catch (err) {
        console.error('Error al obtener plan sanitario:', err);
        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
};

// Obtener un registro de plan_sanitario por ID
export const getSanidadById = async (req, res) => {
    const {
        id
    } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM plan_sanitario WHERE id_sanidad = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({
                message: 'Plan sanitario no encontrado'
            });
        }
        res.json(rows[0]);
    } catch (err) {
        console.error('Error al obtener plan sanitario por ID:', err);
        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
};

// Crear un nuevo registro de plan_sanitario
export const createSanidad = async (req, res) => {
    const {
        fecha_aplicacion,
        tipo_actividad,
        id_ganado,
        dosis,
        supervisor,
        observaciones
    } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO plan_sanitario (fecha_aplicacion, tipo_actividad, id_ganado, dosis, supervisor, observaciones) VALUES (?, ?, ?, ?, ?, ?)',
            [fecha_aplicacion,
                tipo_actividad,
                id_ganado,
                dosis,
                supervisor,
                observaciones]
        );
        res.status(201).json({
            message: 'Plan sanitario creado exitosamente',
            id_sanidad: result.insertId
        });
    } catch (err) {
        console.error('Error al crear plan sanitario:', err);
        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
};

// Actualizar un registro de plan_sanitario
export const updateSanidad = async (req, res) => {
    const {
        id
    } = req.params;
    const {
        fecha_aplicacion,
        tipo_actividad,
        id_ganado,
        dosis,
        supervisor,
        observaciones
    } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE plan_sanitario SET fecha_aplicacion = ?, tipo_actividad = ?, id_ganado = ?, dosis = ?, supervisor = ?, observaciones = ?  WHERE id_sanidad = ?',
            [fecha_aplicacion, tipo_actividad, id_ganado, dosis, supervisor, observaciones, id] 
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Plan sanitario no encontrado para actualizar'
            });
        }
        res.json({
            message: 'Plan sanitario actualizado exitosamente'
        });
    } catch (err) {
        console.error('Error al actualizar plan sanitario:', err);
        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
};


// Eliminar un registro de plan_sanitario

export const deleteSanidad = async (req, res) => {
    const {
        id
    } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM plan_sanitario WHERE id_sanidad = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Plan sanitario no encontrado para eliminar'
            });
        }
        res.json({
            message: 'Plan sanitario eliminado exitosamente'
        });
    } catch (err) {
        console.error('Error al eliminar plan sanitario:', err);
        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
};
