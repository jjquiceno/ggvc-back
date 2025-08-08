import request from 'supertest';
import app from '../index.js';
import pool from '../config/db.js';

let testDefuncionId;

beforeAll(async () => {
  // Puedes preparar datos iniciales aquí si es necesario
});

afterAll(async () => {
  try {
    if (testDefuncionId) {
      await pool.query('DELETE FROM defuncion_ganado WHERE id_defuncion = ?', [testDefuncionId]);
    }
  } catch (error) {
    console.error('Error limpiando la base de datos:', error);
  } finally {
    await pool.end(); // Cierra la conexión
  }
});

describe('API /api/defuncion', () => {

  test('POST /api/defuncion - Crear defunción', async () => {
    try {
      const response = await request(app)
        .post('/api/defuncion')
        .send({
            nombre: 'Ganado de prueba',
            id_ganado: 1,
            genero: 'Hembra', // Asegúrate de que los valores válidos sean 'H' o 'M'
            fecha: '2025-08-08',
            lugar_de_defuncion: 'Finca experimental'
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message', 'Defunción creada exitosamente');
      expect(response.body).toHaveProperty('id_defuncion');

      testDefuncionId = response.body.id_defuncion;
    } catch (error) {
      console.error('Error en POST /api/defuncion:', error);
      throw error;
    }
  });

  test('GET /api/defuncion - Obtener todas las defunciones', async () => {
    const response = await request(app).get('/api/defuncion');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /api/defuncion/:id - Obtener una defunción por ID', async () => {
    if (!testDefuncionId) return;
    const response = await request(app).get(`/api/defuncion/${testDefuncionId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id_defuncion', testDefuncionId);
  });

  test('PUT /api/defuncion/:id - Actualizar una defunción', async () => {
    if (!testDefuncionId) return;
    const response = await request(app)
      .put(`/api/defuncion/${testDefuncionId}`)
      .send({
        nombre: 'Ganado de prueba',
        id_ganado: 1,
        genero: 'Hembra', // Asegúrate de que los valores válidos sean 'H' o 'M'
        fecha: '2025-08-09',
        lugar_de_defuncion: 'Finca experimental'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Defuncion actualizado exitosamente');
  });

  test('DELETE /api/defuncion/:id - Eliminar una defunción', async () => {
    if (!testDefuncionId) return;
    const response = await request(app).delete(`/api/defuncion/${testDefuncionId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Defuncion eliminada exitosamente');
    testDefuncionId = null; // Para evitar eliminarlo de nuevo en afterAll
  });

});
