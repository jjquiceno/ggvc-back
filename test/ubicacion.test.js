import request from 'supertest';
import app from '../index.js';
import pool from '../config/db.js';

describe('API /api/ubicacion', () => {
  let testUbicacionId;
  let testGanadoId;
  let testPotreroId;

  // Crear datos de prueba antes de todas las pruebas
  beforeAll(async () => {
    // Crear un potrero de prueba
    const potreroRes = await request(app)
      .post('/api/potreros')
      .send({
        nombre_potrero: 'Potrero de Prueba Ubicacion',
        area: 1000,
        capacidad: 10,
        estado: 'Disponible'
      });

    testPotreroId = potreroRes.body.id_potrero;

    // Crear un registro de ganado para la relación
    const ganadoRes = await request(app)
      .post('/api/ganado')
      .send({
        nombre: 'Ganado de Prueba Ubicacion',
        fecha_nacimiento: '2023-01-01',
        sexo: 'M',
        raza: 'Holstein',
        estado: 'Activo',
        id_potrero: testPotreroId,
        descripcion: 'Ganado de prueba para tests de ubicacion',
        origen: 'Compra',
        proposito: 'Producción de leche'
      });

    testGanadoId = ganadoRes.body.id_ganado;
  });

  // Limpiar después de todas las pruebas
  afterAll(async () => {
    // Primero, eliminar registros de ubicación
    if (testGanadoId) {
      try {
        await pool.query('DELETE FROM ubicacion WHERE id_ganado = ?', [testGanadoId]);
      } catch (error) {
        console.error('Error al limpiar ubicaciones de prueba:', error.message);
      }
    }

    // Luego, eliminar el ganado
    if (testGanadoId) {
      try {
        await request(app).delete(`/api/ganado/${testGanadoId}`);
      } catch (error) {
        console.error('Error al limpiar ganado de prueba:', error.message);
      }
    }

    // Finalmente, el potrero
    if (testPotreroId) {
      try {
        await request(app).delete(`/api/potreros/${testPotreroId}`);
      } catch (error) {
        console.error('Error al limpiar potrero de prueba:', error.message);
      }
    }
  });

  test('POST /api/ubicacion - Debe crear una nueva ubicación', async () => {
    const testData = {
      id_potrero: testPotreroId,
      id_ganado: testGanadoId
    };

    const res = await request(app)
      .post('/api/ubicacion')
      .send(testData);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id_ubicacion');
    expect(res.body.message).toMatch(/cread[ao]/i);

    // Guardar el ID para pruebas posteriores
    testUbicacionId = res.body.id_ubicacion;
  });

  test('GET /api/ubicacion - Debe obtener todos los registros de ubicación', async () => {
    const res = await request(app).get('/api/ubicacion');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /api/ubicacion/:id - Debe obtener una ubicación por ID', async () => {
    // Primero creamos una ubicación de prueba
    const createRes = await request(app)
      .post('/api/ubicacion')
      .send({
        id_potrero: testPotreroId,
        id_ganado: testGanadoId
      });

    const idToTest = createRes.body.id_ubicacion;

    // Ahora probamos obtenerla
    const res = await request(app).get(`/api/ubicacion/${idToTest}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id_ubicacion', idToTest);
    expect(res.body.id_ganado).toBe(testGanadoId);
    expect(res.body.id_potrero).toBe(testPotreroId);
  });

  test('GET /api/ubicacion/potrero/:id - Debe obtener el potrero de un ganado específico', async () => {
    // Primero creamos una ubicación de prueba
    await request(app)
      .post('/api/ubicacion')
      .send({
        id_potrero: testPotreroId,
        id_ganado: testGanadoId
      });

    // Ahora probamos obtener el potrero por ID de ganado
    const res = await request(app).get(`/api/ubicacion/potrero/${testGanadoId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id_potrero', testPotreroId);
    expect(res.body.id_ganado).toBe(testGanadoId);
  });

  test('PUT /api/ubicacion/:id - Debe actualizar una ubicación', async () => {
    // Primero creamos una ubicación para actualizar
    const createRes = await request(app)
      .post('/api/ubicacion')
      .send({
        id_potrero: testPotreroId,
        id_ganado: testGanadoId
      });

    const idToUpdate = createRes.body.id_ubicacion;

    // Creamos un nuevo potrero para la actualización
    const nuevoPotreroRes = await request(app)
      .post('/api/potreros')
      .send({
        nombre_potrero: 'Nuevo Potrero Prueba',
        area: 2000,
        capacidad: 15,
        estado: 'Disponible'
      });

    const nuevoPotreroId = nuevoPotreroRes.body.id_potrero;

    // Ahora actualizamos la ubicación
    const updateRes = await request(app)
      .put(`/api/ubicacion/${idToUpdate}`)
      .send({
        id_potrero: nuevoPotreroId,
        id_ganado: testGanadoId
      });

    expect(updateRes.statusCode).toBe(200);
    expect(updateRes.body.message).toMatch(/actualizad[ao]/i);

    // Verificamos que los cambios se aplicaron
    const checkRes = await request(app).get(`/api/ubicacion/${idToUpdate}`);
    expect(checkRes.body.id_potrero).toBe(nuevoPotreroId);

    // Limpiar el nuevo potrero después de la prueba
    await request(app).delete(`/api/potreros/${nuevoPotreroId}`);
  });

  test('DELETE /api/ubicacion/:id - Debe eliminar una ubicación', async () => {
    // Primero creamos una ubicación para eliminarla
    const createRes = await request(app)
      .post('/api/ubicacion')
      .send({
        id_potrero: testPotreroId,
        id_ganado: testGanadoId
      });

    const idToDelete = createRes.body.id_ubicacion;

    // Luego la eliminamos
    const deleteRes = await request(app).delete(`/api/ubicacion/${idToDelete}`);
    expect(deleteRes.statusCode).toBe(200);
    expect(deleteRes.body.message).toMatch(/eliminad[ao]/i);

    // Verificamos que ya no existe
    const checkRes = await request(app).get(`/api/ubicacion/${idToDelete}`);
    expect(checkRes.statusCode).toBe(404);
  });

  test('POST /api/ubicacion - Debe fallar sin campos requeridos', async () => {
    const testData = {
      // Faltan id_potrero e id_ganado
    };

    const res = await request(app)
      .post('/api/ubicacion')
      .send(testData);

    // Esperamos un error 400 o 500 dependiendo de la validación del servidor
    expect([400, 500]).toContain(res.statusCode);
  });

  test('GET /api/ubicacion/999999 - Debe fallar con ubicación inexistente', async () => {
    const res = await request(app).get('/api/ubicacion/999999');
    expect(res.statusCode).toBe(404);
  });
});