// test/visitas.test.js

import request from 'supertest';
import app from '../index.js';
import pool from '../config/db.js';

describe('Visitas Médicas API Tests', () => {
  // Test data
  const testVisita = {
    id_ganado: 1, // This should be an existing ganado ID in your test database
    fecha_visita: '2025-08-10',
    motivo: 'Control de rutina',
    sintomas: 'Ninguno',
    diagnostico: 'Sano',
    tratamiento: 'Ninguno',
    prox_visita: '2025-09-10'
  };

  // Clean up before and after tests
  beforeAll(async () => {
    // Make sure we have a test animal
    await pool.query(`
      INSERT INTO ganado (id_ganado, nombre, descripcion, fecha_nacimiento, sexo, raza, estado, origen, proposito) 
      VALUES (1, 'Test Animal', 'Test Desc', '2023-01-01', 'M', 'Angus', 'Activo', 'Compra', 'Carne')
      ON DUPLICATE KEY UPDATE nombre=nombre;
    `);
    
    // Clean any previous test data
    await pool.query("DELETE FROM visitas_medicas WHERE motivo LIKE '%Test%'");
    await pool.query("DELETE FROM defuncion_ganado WHERE id_ganado = 1"); // Added this line to clean up the new foreign key
  });

  afterAll(async () => {
    // Clean up test data (delete child records first due to foreign key constraint)
    await pool.query("DELETE FROM visitas_medicas WHERE motivo LIKE '%Test%'");
    await pool.query("DELETE FROM defuncion_ganado WHERE id_ganado = 1"); // Added this line to clean up the new foreign key
    await pool.query('DELETE FROM ganado WHERE id_ganado = 1');
    // Close the database connection
    await pool.end();
  });

  describe('POST /api/visitas', () => {
    it('should create a new medical visit', async () => {
      const res = await request(app)
        .post('/api/visitas')
        .send(testVisita);
      
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('message', 'Visita medica creada exitosamente');
      expect(res.body).toHaveProperty('id_visita');
      
      // Save the ID for later tests
      testVisita.id_visita = res.body.id_visita;
    });

    it('should fail with missing required fields', async () => {
      const res = await request(app)
        .post('/api/visitas')
        .send({
          // Missing required fields
          motivo: 'Test Missing Fields'
        });
      
      // Expected a 400 Bad Request now that validation is in place
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Faltan campos obligatorios: id_ganado, fecha_visita, motivo, diagnostico');
    });
  });

  describe('GET /api/visitas', () => {
    it('should get all medical visits', async () => {
      const res = await request(app)
        .get('/api/visitas');
      
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      // Check if our test visit is in the list
      const testVisit = res.body.find(v => v.motivo === testVisita.motivo);
      expect(testVisit).toBeTruthy();
    });
  });

  describe('GET /api/visitas/:id', () => {
    it('should get medical visits by animal ID', async () => {
      const res = await request(app)
        .get(`/api/visitas/${testVisita.id_ganado}`);
      
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0].id_ganado).toBe(testVisita.id_ganado);
    });

    it('should return 404 for non-existent animal ID', async () => {
      const res = await request(app)
        .get('/api/visitas/999999');
      
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message', 'Visitas no encontradas para ese ganado');
    });
  });

  describe('PUT /api/visitas/:id', () => {
    it('should update an existing medical visit', async () => {
      const updatedData = {
        ...testVisita,
        motivo: 'Updated Test Reason',
        diagnostico: 'Updated Diagnosis'
      };
      
      const res = await request(app)
        .put(`/api/visitas/${testVisita.id_visita}`)
        .send(updatedData);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Visita actualizada exitosamente');
      
      // Verify the update
      const checkRes = await request(app).get(`/api/visitas/${testVisita.id_ganado}`);
      const updatedVisit = checkRes.body.find(v => v.id_visita === testVisita.id_visita);
      expect(updatedVisit.motivo).toBe('Updated Test Reason');
      expect(updatedVisit.diagnostico).toBe('Updated Diagnosis');
    });

    it('should fail to update with non-existent animal ID', async () => {
      const res = await request(app)
        .put(`/api/visitas/${testVisita.id_visita}`)
        .send({
          ...testVisita,
          id_ganado: 999999 // Non-existent animal ID
        });
      
      // Changed to 400 as the API now returns a more specific error
      expect(res.statusCode).toEqual(400); 
      expect(res.body).toHaveProperty('message', 'No existe ningún animal con id_ganado = 999999');
    });
  });

  describe('DELETE /api/visitas/:id', () => {
    it('should delete an existing medical visit', async () => {
      // First, create a new visit to delete
      const createRes = await request(app)
        .post('/api/visitas')
        .send({...testVisita, motivo: 'Test Visit to Delete'});
      
      const visitId = createRes.body.id_visita;
      
      const res = await request(app)
        .delete(`/api/visitas/${visitId}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Visita eliminada exitosamente');
      
      // Verify it's gone
      const checkRes = await request(app).get(`/api/visitas/${testVisita.id_ganado}`);
      const deletedVisit = checkRes.body.find(v => v.id_visita === visitId);
      expect(deletedVisit).toBeUndefined();
    });

    it('should return 404 when trying to delete non-existent visit', async () => {
      const res = await request(app)
        .delete('/api/visitas/999999');
      
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message', 'Visita no encontrada para eliminar');
    });
  });
});
