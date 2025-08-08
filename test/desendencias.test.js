import request from 'supertest';
import app from '../index.js';
import pool from '../config/db.js';

describe('API /api/descendencias', () => {
  let testDescendenciaId;
  let idGanado = 1;
  let idMadre = 2;
  let idPadre = 3;

  // GET ALL
  test('GET /api/descendencias - debe retornar todas las descendencias', async () => {
    const res = await request(app).get('/api/descendencias');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // CREATE
  test('POST /api/descendencias - debe crear una nueva descendencia', async () => {
    const res = await request(app).post('/api/descendencias').send({
      id_ganado: idGanado,
      id_madre: idMadre,
      id_padre: idPadre
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id_descendencia');
    testDescendenciaId = res.body.id_descendencia;
  });

  // GET BY ID
  test('GET /api/descendencias/:id - debe retornar una descendencia por ID', async () => {
    const res = await request(app).get(`/api/descendencias/${testDescendenciaId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id_descendencia');
  });

  // UPDATE
  test('PUT /api/descendencias/:id - debe actualizar una descendencia', async () => {
    const res = await request(app).put(`/api/descendencias/${testDescendenciaId}`).send({
      id_ganado: idGanado,
      id_madre: idMadre,
      id_padre: idPadre
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/actualizado/i);
  });

  // DELETE
  test('DELETE /api/descendencias/:id - debe eliminar una descendencia', async () => {
    const res = await request(app).delete(`/api/descendencias/${testDescendenciaId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/eliminad[ao]/i);
  });

  afterAll(async () => {
    await pool.end();
  });
});
