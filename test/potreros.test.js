import request from 'supertest';
import app from '../index.js';

let testPotreroId;

// Datos de prueba para potrero
const potreroData = {
  nombre_potrero: 'Potrero de Prueba'
};

// Datos actualizados para pruebas de actualización
const updatedPotreroData = {
  nombre_potrero: 'Potrero Actualizado'
};

describe('API /api/potreros', () => {
  // Limpiar después de todas las pruebas
  afterAll(async () => {
    if (testPotreroId) {
      await request(app).delete(`/api/potreros/${testPotreroId}`);
    }
  });

  test('POST /api/potreros - Debe crear un nuevo registro de potrero', async () => {
    const res = await request(app)
      .post('/api/potreros')
      .send(potreroData);
    
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id_potrero');
    expect(res.body.message).toMatch(/cread[ao]/i);
    
    // Guardar el ID para pruebas posteriores
    testPotreroId = res.body.id_potrero;
  });

  test('GET /api/potreros - Debe obtener todos los registros de potreros', async () => {
    const res = await request(app).get('/api/potreros');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('GET /api/potreros/:id - Debe obtener un registro de potrero por ID', async () => {
    const res = await request(app).get(`/api/potreros/${testPotreroId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id_potrero', testPotreroId);
    expect(res.body.nombre_potrero).toBe(potreroData.nombre_potrero);
  });

  test('PUT /api/potreros/:id - Debe actualizar un registro de potrero', async () => {
    const res = await request(app)
      .put(`/api/potreros/${testPotreroId}`)
      .send(updatedPotreroData);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/actualizad[ao]/i);

    // Verificar que los cambios se aplicaron
    const checkRes = await request(app).get(`/api/potreros/${testPotreroId}`);
    expect(checkRes.body.nombre_potrero).toBe(updatedPotreroData.nombre_potrero);
  });

  test('DELETE /api/potreros/:id - Debe eliminar un registro de potrero', async () => {
    const res = await request(app).delete(`/api/potreros/${testPotreroId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/eliminad[ao]/i);
    testPotreroId = null; // Para evitar intentar borrar de nuevo en afterAll
  });

  test('GET /api/potreros/999999 - Debe fallar con registro de potrero inexistente', async () => {
    const res = await request(app).get('/api/potreros/999999');
    expect(res.statusCode).toBe(404);
  });

  test('POST /api/potreros - Debe fallar sin nombre_potrero', async () => {
    const res = await request(app)
      .post('/api/potreros')
      .send({});
    
    // Ahora esperamos un 400 porque el controlador valida el campo requerido
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toContain('nombre_potrero');
  });
});