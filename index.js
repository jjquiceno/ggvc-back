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
import sanitarioRoutes from './routes/sanitarioRoutes.js';
import palpacionesRoutes from './routes/palpacionesRoutes.js';
import descendenciasRoutes from './routes/descendenciasRoutes.js';
import visitasRoutes from './routes/visitasRoutes.js';
import nutricionRoutes from './routes/nutricionRoutes.js';
import requerimientosRoutes from './routes/requerimientosRoutes.js';
import pesoRoutes from './routes/pesoRoutes.js';
import produccionesRoutes from './routes/produccionesRoutes.js';

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

// Usar las rutas de plan_sanitario
app.use('/api/plan_sanitario', sanitarioRoutes);

// Usar las rutas de palpaciones
app.use('/api/palpaciones', palpacionesRoutes);

// Usar las rutas de descendencias
app.use('/api/descendencias', descendenciasRoutes);

// Usar las rutas de visitas_medicas
app.use('/api/visitas', visitasRoutes);

// Usar las rutas de req_BPG
app.use('/api/requerimientos', requerimientosRoutes);

// Usar las rutas de peso
app.use('/api/peso', pesoRoutes);

// Usar las rutas de producciones
app.use('/api/producciones', produccionesRoutes);


// Usar las rutas de nutricion
app.use('/api/nutricion', nutricionRoutes);

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