import express from 'express';
import pool from './config/db.js'; // Importa el pool de conexiones
import cors from 'cors';
import cookieParser from 'cookie-parser';

import ganadoRoutes from './routes/ganadoRoutes.js'; 
import empleadoRoutes from './routes/empleadoRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js'; 


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Middleware para parsear JSON en las solicitudes
app.use(express.json());

app.use(cookieParser());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Bienvenido al backend de GGVC!');
});

// Usar las rutas de ganado
app.use('/api/ganado', ganadoRoutes);

// Usar las rutas de empleado
app.use('/api/empleado', empleadoRoutes);

// Usar las rutas de usuario
app.use('/api/usuario', usuarioRoutes);

// Manejo de errores para rutas no encontradas
app.use((req, res, next) => {
  res.status(404).send('Ruta no encontrada');
});

// Manejador de errores general
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('¡Algo salió mal!');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

export default app;