import pool from '../config/db.js';

// Obtener todos los registros de ubicacion
export const getAllUbicacion = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM ubicacion');
        res.json(rows);
    } catch (err) {
        console.error('Error al obtener ubicacion:', err);
        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
};

// Obtener un registro de ubicacion por ID
export const getUbicacionById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM ubicacion WHERE id_ubicacion = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({
                message: 'Ubicacion no encontrado'
            });
        }
        res.json(rows[0]);
    } catch (err) {
        console.error('Error al obtener ubicacion por ID:', err);
        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
};

export const getPotreroByGanado = async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await pool.query(
            'SELECT * FROM ubicacion WHERE id_ganado = ?',
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: 'No se encontró potrero para ese ganado' });
        }

        res.json(rows[0]); // solo uno
    } catch (err) {
        console.error('Error al obtener potrero:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Crear un nuevo registro de ubicacion con validación
export const createUbicacion = async (req, res) => {
    const {
        id_potrero,
        id_ganado
    } = req.body;

    // Validación para asegurarse de que ambos campos existan
    if (!id_potrero || !id_ganado) {
        return res.status(400).json({
            message: 'Faltan campos requeridos: id_potrero e id_ganado'
        });
    }

    try {
        const [result] = await pool.query(
            'INSERT INTO ubicacion (id_potrero, id_ganado) VALUES (?, ?)',
            [id_potrero, id_ganado]
        );
        res.status(201).json({
            message: 'Ubicacion creada exitosamente',
            id_ubicacion: result.insertId
        });
    } catch (err) {
        console.error('Error al crear ubicacion:', err);
        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
};

// Actualizar un registro de ubicacion
export const updateUbicacion = async (req, res) => {
    const {
        id
    } = req.params;
    const {
        id_potrero,
        id_ganado
    } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE ubicacion SET id_potrero = ?, id_ganado = ? WHERE id_ubicacion = ?',
            [id_potrero, id_ganado, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Ubicacion no encontrada para actualizar'
            });
        }
        res.json({
            message: 'Ubicacion actualizada exitosamente'
        });
    } catch (err) {
        console.error('Error al actualizar ubicacion:', err);
        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
};


// Eliminar un registro de ubicacion
export const deleteUbicacion = async (req, res) => {
    const { id } = req.params;
    try {
        // La consulta SQL debe usar id_ubicacion, no id_ganado
        const [result] = await pool.query('DELETE FROM ubicacion WHERE id_ubicacion = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Ubicacion no encontrada para eliminar'
            });
        }
        res.json({
            message: 'Ubicacion eliminada exitosamente'
        });
    } catch (err) {
        console.error('Error al eliminar ubicacion:', err);
        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
};
