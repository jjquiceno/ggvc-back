import request from 'supertest';
import app from '../index.js'; // asegúrate que este sea el path correcto
import pool from '../config/db.js'; // conexión a la base de datos

let idInsertado;

beforeAll(async () => {
  // Insertar usuario relacionado
  await pool.query(`
    INSERT INTO usuarios (usuario, contraseña, rol, dni, nombre)
    VALUES ('testuser', 'testpass', 'admin', 9999, 'Test User')
  `);
});

afterAll(async () => {
  // Eliminar datos de prueba
  if (idInsertado) {
    await pool.query(`DELETE FROM empleado WHERE id_empleado = ?`, [idInsertado]);
  }

  await pool.query(`DELETE FROM usuarios WHERE usuario = 'testuser'`);
  await pool.end(); // cerrar conexión a BD
});

describe('API /api/empleado', () => {
  test('POST /api/empleado debe crear un nuevo empleado', async () => {
    const empleadoData = {
      usuario: 'testuser',
      dni: 9999,
      nombre: 'Empleado de Prueba',
      email: 'prueba@email.com',
      telefono: '1234567890'
    };

    const res = await request(app).post('/api/empleado').send(empleadoData);
    console.log("POST response body:", res.body);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'Empleado creado exitosamente');
    expect(res.body).toHaveProperty('id_empleado');

    idInsertado = res.body.id_empleado;
  });

  test('GET /api/empleado/:id_empleado debe devolver un solo empleado', async () => {
    const res = await request(app).get(`/api/empleado/${idInsertado}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id_empleado');
  });

  test('PUT /api/empleado/:id_empleado debe actualizar el empleado', async () => {
    const nuevoEmpleado = {
      usuario: 'testuser',
      dni: 9999,
      nombre: 'Empleado Actualizado',
      email: 'actualizado@email.com',
      telefono: '0987654321'
    };

    const res = await request(app).put(`/api/empleado/${idInsertado}`).send(nuevoEmpleado);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Empleado actualizado exitosamente');
  });

  test('DELETE /api/empleado/:id_empleado debe eliminar el empleado', async () => {
    const res = await request(app).delete(`/api/empleado/${idInsertado}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Empleado eliminado exitosamente');

    // No eliminar de nuevo en afterAll
    idInsertado = null;
  });
});
