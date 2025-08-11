import request from 'supertest';
import app from '../index.js';
import pool from '../config/db.js'; // Necesitamos el pool para la limpieza de los tests

// Función para formatear la fecha en formato YYYY-MM-DD
const getCurrentDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

// Función para crear datos de prueba con formato consistente
const createSanidadData = (ganadoId) => ({
  fecha_aplicacion: getCurrentDate(),
  tipo_actividad: 'Desparasitación',
  id_ganado: ganadoId,
  dosis: '5ml',
  supervisor: 'Dr. Veterinario',
  observaciones: 'Aplicación exitosa'
});

describe('API /api/plan_sanitario', () => {
  let testSanidadId;
  let testGanadoId;
  let testPotreroId;

  // Crear datos de prueba antes de todas las pruebas
  beforeAll(async () => {
    // Crear un potrero de prueba
    const potreroRes = await request(app)
      .post('/api/potreros')
      .send({
        nombre_potrero: 'Potrero de Prueba Sanitario',
        area: 1000,
        capacidad: 10,
        estado: 'Disponible'
      });

    testPotreroId = potreroRes.body.id_potrero;

    // Crear un registro de ganado para la relación
    const ganadoRes = await request(app)
      .post('/api/ganado')
      .send({
        nombre: 'Ganado de Prueba Sanitario',
        fecha_nacimiento: '2023-01-01',
        sexo: 'M',
        raza: 'Holstein',
        estado: 'Activo',
        id_potrero: testPotreroId,
        descripcion: 'Ganado de prueba para tests de sanitario',
        origen: 'Compra',
        proposito: 'Producción de leche'
      });

    testGanadoId = ganadoRes.body.id_ganado;
  });

  // Limpiar después de todas las pruebas
  afterAll(async () => {
    // Primero, eliminar todos los registros de sanidad relacionados con el ganado de prueba
    if (testGanadoId) {
      try {
        await pool.query('DELETE FROM plan_sanitario WHERE id_ganado = ?', [testGanadoId]);
      } catch (error) {
        console.error('Error al limpiar registros de sanidad:', error.message);
      }
    }

    // Luego, eliminar el ganado de prueba
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


  test('POST /api/plan_sanitario - Debe crear un nuevo registro de sanidad', async () => {
    const testData = createSanidadData(testGanadoId);

    const res = await request(app)
      .post('/api/plan_sanitario')
      .send(testData);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id_sanidad');
    expect(res.body.message).toMatch(/cread[ao]/i);

    // Guardar el ID para pruebas posteriores
    testSanidadId = res.body.id_sanidad;
  });

  test('GET /api/plan_sanitario - Debe obtener todos los registros de sanidad', async () => {
    const res = await request(app).get('/api/plan_sanitario');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /api/plan_sanitario/:id - Debe obtener un registro de sanidad por ID', async () => {
    // Primero creamos un registro de prueba
    const testData = createSanidadData(testGanadoId);
    const createRes = await request(app)
      .post('/api/plan_sanitario')
      .send(testData);

    const idToTest = createRes.body.id_sanidad;

    // Ahora probamos obtenerlo
    const res = await request(app).get(`/api/plan_sanitario/${idToTest}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id_sanidad', idToTest);
    expect(res.body.id_ganado).toBe(testGanadoId);
    expect(res.body.tipo_actividad).toBe('Desparasitación');

    // Limpiar después de la prueba
    await request(app).delete(`/api/plan_sanitario/${idToTest}`);
  });

  test('PUT /api/plan_sanitario/:id - Debe actualizar un registro de sanidad', async () => {
    // Primero crear un registro para actualizar
    const createRes = await request(app)
      .post('/api/plan_sanitario')
      .send(createSanidadData(testGanadoId));

    const idToUpdate = createRes.body.id_sanidad;

    // Ahora actualizarlo
    const updateData = {
      ...createSanidadData(testGanadoId),
      tipo_actividad: 'Vacunación',
      dosis: '2ml',
      observaciones: 'Vacuna aplicada',
      fecha_aplicacion: getCurrentDate()
    };

    const updateRes = await request(app)
      .put(`/api/plan_sanitario/${idToUpdate}`)
      .send(updateData);

    expect(updateRes.statusCode).toBe(200);
    expect(updateRes.body.message).toMatch(/actualizad[ao]/i);

    // Verificar que los cambios se aplicaron
    const checkRes = await request(app).get(`/api/plan_sanitario/${idToUpdate}`);
    expect(checkRes.body.tipo_actividad).toBe('Vacunación');
    expect(checkRes.body.dosis).toBe('2ml');

    // Limpiar después de la prueba
    await request(app).delete(`/api/plan_sanitario/${idToUpdate}`);
  });

  test('GET /api/plan_sanitario/999999 - Debe fallar con registro de sanidad inexistente', async () => {
    const res = await request(app).get('/api/plan_sanitario/999999');
    expect(res.statusCode).toBe(404);
  });

  test('POST /api/plan_sanitario - Debe fallar sin campos requeridos (ahora con validación)', async () => {
    const requiredFields = ['fecha_aplicacion', 'tipo_actividad', 'id_ganado'];
    const baseData = createSanidadData(testGanadoId);

    for (const field of requiredFields) {
      const testData = { ...baseData
      };
      delete testData[field];

      const res = await request(app)
        .post('/api/plan_sanitario')
        .send(testData);

      // Debería devolver 400 para campos requeridos faltantes
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toContain('Faltan campos requeridos');
    }
  });

  test('DELETE /api/plan_sanitario/:id - Debe eliminar un registro de sanidad', async () => {
    // Primero crear un registro para eliminarlo
    const createRes = await request(app)
      .post('/api/plan_sanitario')
      .send({
        ...createSanidadData(testGanadoId),
        observaciones: 'Registro para prueba de eliminación'
      });

    const idToDelete = createRes.body.id_sanidad;

    // Luego eliminarlo
    const deleteRes = await request(app).delete(`/api/plan_sanitario/${idToDelete}`);
    expect(deleteRes.statusCode).toBe(200);
    expect(deleteRes.body.message).toMatch(/eliminad[ao]/i);

    // Verificar que ya no existe
    const checkRes = await request(app).get(`/api/plan_sanitario/${idToDelete}`);
    expect(checkRes.statusCode).toBe(404);
  });
});

