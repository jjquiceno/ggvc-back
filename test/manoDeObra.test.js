import request from 'supertest';
import app from '../index.js';

let testObraId;
let testEmpleadoId;

// Datos de prueba
const obraData = {
  fecha: '2025-08-10',
  tipo: 'Mantenimiento',
  actividad: 'Limpieza de establos',
  duracion: 4.5
};

// Crear un empleado de prueba antes de los tests
describe('API /api/mano_de_obra', () => {
  beforeAll(async () => {
    // Crear un empleado de prueba
    const empleado = await request(app)
      .post('/api/empleados')
      .send({
        nombre: 'Juan Pérez',
        cargo: 'Cuidador',
        telefono: '1234567890',
        direccion: 'Calle Falsa 123',
        fecha_contratacion: '2024-01-01',
        salario: 2500.00
      });
    testEmpleadoId = empleado.body.id_empleado;
  });

  // Limpiar después de todas las pruebas
  afterAll(async () => {
    if (testObraId) {
      await request(app).delete(`/api/mano_de_obra/${testObraId}`);
    }
    if (testEmpleadoId) {
      await request(app).delete(`/api/empleados/${testEmpleadoId}`);
    }
  });

  test('POST /api/mano_de_obra - Debe crear un nuevo registro de mano de obra', async () => {
    const res = await request(app)
      .post('/api/mano_de_obra')
      .send({
        ...obraData,
        id_empleado: testEmpleadoId
      });
    
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id_obra');
    expect(res.body.message).toMatch(/cread[ao]/i);
    
    // Guardar el ID para pruebas posteriores
    testObraId = res.body.id_obra;
  });

  test('GET /api/mano_de_obra - Debe obtener todos los registros de mano de obra', async () => {
    const res = await request(app).get('/api/mano_de_obra');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('GET /api/mano_de_obra/:id - Debe obtener un registro de mano de obra por ID', async () => {
    const res = await request(app).get(`/api/mano_de_obra/${testObraId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id_obra', testObraId);
    expect(res.body.actividad).toBe(obraData.actividad);
  });

  test('PUT /api/mano_de_obra/:id - Debe actualizar un registro de mano de obra', async () => {
    const updatedData = {
      fecha: '2025-08-11',
      id_empleado: testEmpleadoId,
      tipo: 'Reparación',
      actividad: 'Reparación de cercas',
      duracion: 6.0
    };

    const res = await request(app)
      .put(`/api/mano_de_obra/${testObraId}`)
      .send(updatedData);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/actualizad[ao]/i);

    // Verificar que los cambios se aplicaron
    const checkRes = await request(app).get(`/api/mano_de_obra/${testObraId}`);
    expect(checkRes.body.actividad).toBe('Reparación de cercas');
    expect(parseFloat(checkRes.body.duracion)).toBe(6.0);
  });

  test('DELETE /api/mano_de_obra/:id - Debe eliminar un registro de mano de obra', async () => {
    const res = await request(app).delete(`/api/mano_de_obra/${testObraId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/eliminad[ao]/i);
    testObraId = null; // Para evitar intentar borrar de nuevo en afterAll
  });

  test('GET /api/mano_de_obra/999999 - Debe fallar con registro de mano de obra inexistente', async () => {
    const res = await request(app).get('/api/mano_de_obra/999999');
    expect(res.statusCode).toBe(404);
  });
});