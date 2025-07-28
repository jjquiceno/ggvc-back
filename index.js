import express from 'express';
import pool from './config/db.js'; // Importa el pool de conexiones
import cors from 'cors';
import cookieParser from 'cookie-parser';

import ganadoRoutes from './routes/ganadoRoutes.js'; 
import empleadoRoutes from './routes/empleadoRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js'; 
import criaRoutes from './routes/criaRoutes.js';
import defuncionRoutes from './routes/defuncionRoutes.js';
import enfermedadesRoutes from './routes/enfermedadesRoutes.js';
import manoDeObraRoutes from './routes/manoDeObraRoutes.js';
import potrerosRoutes from './routes/potrerosRoutes.js';
import ubicacionRoutes from './routes/ubicacionRoutes.js';

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

// Usar las rutas de cria
app.use('/api/cria', criaRoutes);

// Usar las rutas de defuncion
app.use('/api/defuncion', defuncionRoutes);

// Usar las rutas de enfermedades
app.use('/api/enfermedades', enfermedadesRoutes);

// Usar las rutas de mano_de_obra
app.use('/api/mano_de_obra', manoDeObraRoutes);

// Usar las rutas de potreros
app.use('/api/potreros', potrerosRoutes);

// Usar las rutas de ubicacion
app.use('/api/ubicacion', ubicacionRoutes);

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