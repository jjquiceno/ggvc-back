import request from 'supertest';
import app from '../index.js';
import pool from '../config/db.js';

describe('Pruebas de la API de Usuarios', () => {
  // Test data
  const testUser = {
    dni: '12345678',
    nombre_empleado: 'Usuario de Prueba',
    email_empleado: 'test@example.com',
    telefono_empleado: '1234567890',
    usuario: 'testuser',
    contrasena: 'password123',
    rol: 'admin'
  };

  // Clean the database before and after tests
  beforeAll(async () => {
    // Clean any previous test data
    await pool.query('DELETE FROM usuarios WHERE usuario LIKE ?', ['test%']);
    await pool.query('DELETE FROM empleado WHERE nombre_empleado LIKE ?', ['%Prueba%']); // Correct column name
  });

  afterAll(async () => {
    // Clean up after tests
    await pool.query('DELETE FROM usuarios WHERE usuario LIKE ?', ['test%']);
    await pool.query('DELETE FROM empleado WHERE nombre_empleado LIKE ?', ['%Prueba%']); // Correct column name
    // Close the database connection
    await pool.end();
  });

  describe('POST /api/usuario/register', () => {
    it('should register a new user correctly', async () => {
      const res = await request(app)
        .post('/api/usuario/register')
        .send(testUser);
      
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('message', 'Empleado y usuario creados exitosamente');
      expect(res.body).toHaveProperty('usuarioCreado', testUser.usuario);
    });

    it('should fail if required fields are missing', async () => {
      const res = await request(app)
        .post('/api/usuario/register')
        .send({
          usuario: 'incompleto',
          // Required fields are missing
        });
      
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message');
    });

    it('should not allow duplicate users', async () => {
      // Try to create the same user twice
      await request(app).post('/api/usuario/register').send(testUser);
      const res = await request(app)
        .post('/api/usuario/register')
        .send(testUser);
      
      expect(res.statusCode).toEqual(409);
      expect(res.body).toHaveProperty('message', 'El nombre de usuario ya existe');
    });
  });

  describe('POST /api/usuario/login', () => {
    it('should log in correctly with valid credentials', async () => {
      // Ensure the test user exists
      await request(app).post('/api/usuario/register').send(testUser);
      
      const res = await request(app)
        .post('/api/usuario/login')
        .send({
          usuario: testUser.usuario,
          contrasena: testUser.contrasena
        });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('user');
      expect(res.body).toHaveProperty('token');
      expect(res.body.user.usuario).toBe(testUser.usuario);
    });

    it('should fail with incorrect credentials', async () => {
      const res = await request(app)
        .post('/api/usuario/login')
        .send({
          usuario: 'usuarioinexistente',
          contrasena: 'contrasenaincorrecta'
        });
      
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message', 'Usuario no encontrado');
    });

    it('should fail if user or password is missing', async () => {
      const res = await request(app)
        .post('/api/usuario/login')
        .send({ usuario: 'sindatos' });
      
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message');
    });
  });

  describe('GET /api/usuario', () => {
    it('should get all users', async () => {
      // Create a test user
      await request(app).post('/api/usuario/register').send(testUser);
      
      const res = await request(app)
        .get('/api/usuario');
      
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/usuario/:user', () => {
    it('should get a user by their username', async () => {
      // Create a test user
      await request(app).post('/api/usuario/register').send(testUser);
      
      const res = await request(app)
        .get(`/api/usuario/${testUser.usuario}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('usuario', testUser.usuario);
    });

    it('should return 404 for a user that does not exist', async () => {
      const res = await request(app)
        .get('/api/usuario/usuarioinexistente');
      
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message', 'Usuario no encontrado');
    });
  });

  describe('PUT /api/usuario/:user', () => {
    it('should update an existing user', async () => {
      // Create a test user
      await request(app).post('/api/usuario/register').send(testUser);
      
      const updatedData = {
        ...testUser,
        nombre_empleado: 'Usuario Modificado',
        email_empleado: 'modificado@example.com'
      };
      
      const res = await request(app)
        .put(`/api/usuario/${testUser.usuario}`)
        .send(updatedData);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Usuario actualizado exitosamente');
      
      // Verify that the changes were applied
      const checkRes = await request(app).get(`/api/usuario/${testUser.usuario}`);
      expect(checkRes.body.nombre).toBe(updatedData.nombre_empleado);
    });
  });

  describe('DELETE /api/usuario/:user', () => {
    it('should delete an existing user', async () => {
      // Create a test user
      await request(app).post('/api/usuario/register').send(testUser);
      
      const res = await request(app)
        .delete(`/api/usuario/${testUser.usuario}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Usuario y empleado eliminados exitosamente');
      
      // Verify that the user no longer exists
      const checkRes = await request(app).get(`/api/usuario/${testUser.usuario}`);
      expect(checkRes.statusCode).toEqual(404);
    });
  });

  describe('GET /api/usuario/protected', () => {
    it('should access the protected route with a valid token', async () => {
      // Log in to get a token
      await request(app).post('/api/usuario/register').send(testUser);
      const loginRes = await request(app)
        .post('/api/usuario/login')
        .send({
          usuario: testUser.usuario,
          contrasena: testUser.contrasena
        });
      
      const token = loginRes.body.token;
      
      // Access the protected route
      const res = await request(app)
        .get('/api/usuario/protected')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message');
    });

    it('should fail without a token', async () => {
      const res = await request(app)
        .get('/api/usuario/protected');
      
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('message', 'Token requerido');
    });
  });
});
