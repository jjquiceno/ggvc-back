import request from 'supertest';
import app from '../index.js'; // o el archivo donde está tu app
import pool from '../config/db.js';

describe('Cria API', () => {
  // Limpiar o preparar la base de datos antes/después si lo deseas

  // GET ALL
  test('GET /api/cria - debe retornar todas las crías', async () => {
    const res = await request(app).get('/api/cria');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // CREATE
  let criaId;
  test('POST /api/cria - debe crear una nueva cría', async () => {
    const res = await request(app).post('/api/cria').send({
      id_parto: 1,
      fecha_nacimiento: '2025-08-08',
      sexo: 'H',
      peso_al_nacer: 30,
      color: 'negro'
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id_cria');
    criaId = res.body.id_cria;
  });

  // GET BY ID
  test('GET /api/cria/:id - debe retornar una cría por ID', async () => {
    const res = await request(app).get(`/api/cria/${criaId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id_cria');
  });

  // UPDATE
  test('PUT /api/cria/:id - debe actualizar una cría', async () => {
    const res = await request(app).put(`/api/cria/${criaId}`).send({
      id_parto: 1,
      fecha_nacimiento: '2025-08-09',
      sexo: 'M',
      peso_al_nacer: 32,
      color: 'blanco'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/actualizado exitosamente/i);
  });

  // DELETE
  test('DELETE /api/cria/:id - debe eliminar una cría', async () => {
    const res = await request(app).delete(`/api/cria/${criaId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/eliminada exitosamente/i);
  });

  afterAll(async () => {
    await pool.end(); // cierra la conexión a la BD
  });
});
