import request from 'supertest';
import app from '../index.js';

let testEnfermedadId;
let testGanadoId;

// Datos de prueba
const enfermedadData = {
  enfermedad: 'Fiebre Aftosa',
  fecha_diagnostico: '2025-08-10',
  sintomas: 'Fiebre alta, ampollas en la boca',
  tratamiento: 'Aislamiento y medicación',
  estado_actual: 'En tratamiento'
};

// Crear un ganado de prueba antes de los tests
describe('API /api/enfermedades', () => {
  beforeAll(async () => {
    // Crear un ganado de prueba
    const ganado = await request(app)
      .post('/api/ganado')
      .send({
        nombre: 'Vaca de Prueba',
        raza: 'Holstein',
        sexo: 'Hembra',
        fecha_nacimiento: '2020-01-01',
        origen: 'Finca Los Álamos',
        proposito: 'Leche',
        estado: 'Sano',
        descripcion: 'Ganado de prueba para tests de enfermedades'
      });
    testGanadoId = ganado.body.id_ganado;
  });

  test('POST /api/enfermedades - Debe crear una nueva enfermedad', async () => {
    const res = await request(app)
      .post('/api/enfermedades')
      .send({
        ...enfermedadData,
        id_ganado: testGanadoId
      });
    
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id_diagnostico');
    testEnfermedadId = res.body.id_diagnostico;
  });

  test('GET /api/enfermedades - Debe obtener todas las enfermedades', async () => {
    const res = await request(app).get('/api/enfermedades');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /api/enfermedades/:id - Debe obtener una enfermedad por ID', async () => {
    const res = await request(app).get(`/api/enfermedades/${testEnfermedadId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id_diagnostico', testEnfermedadId);
    expect(res.body).toHaveProperty('enfermedad', enfermedadData.enfermedad);
  });

  test('PUT /api/enfermedades/:id - Debe actualizar una enfermedad', async () => {
    const updatedData = {
      ...enfermedadData,
      id_ganado: testGanadoId,
      estado_actual: 'Recuperada',
      tratamiento: 'Tratamiento completado con éxito'
    };

    const res = await request(app)
      .put(`/api/enfermedades/${testEnfermedadId}`)
      .send(updatedData);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/actualizada/i);
  });

  test('DELETE /api/enfermedades/:id - Debe eliminar una enfermedad', async () => {
    const res = await request(app).delete(`/api/enfermedades/${testEnfermedadId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/eliminad[ao]/i);
  });

  // Limpieza después de los tests
  afterAll(async () => {
    // Eliminar el ganado de prueba
    if (testGanadoId) {
      await request(app).delete(`/api/ganado/${testGanadoId}`);
    }
  });
});