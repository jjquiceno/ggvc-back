import request from 'supertest';
import app from '../index.js';

let idMadre;
let idPadre;
let idGanadoHijo;
let testDescendenciaId;

beforeAll(async () => {
  // Crear madre
  const madre = await request(app)
    .post('/api/ganado')
    .send({
      nombre: 'Vaca Madre Test',
      raza: 'Holstein',
      sexo: 'Hembra',
      fecha_nacimiento: '2020-01-01',
      origen: 'Finca Los Álamos',
      proposito: 'Leche',
      estado: 'Sano',
      descripcion: 'Vaca de prueba para test.'
    });
  idMadre = madre.body.id_ganado;

  // Crear padre
  const padre = await request(app)
    .post('/api/ganado')
    .send({
      nombre: 'Toro Padre Test',
      raza: 'Brahman',
      sexo: 'Macho',
      fecha_nacimiento: '2019-01-01',
      origen: 'Compra',
      proposito: 'Reproducción',
      estado: 'Sano',
      descripcion: 'Toro de prueba para test.'
    });
  idPadre = padre.body.id_ganado;

  // Crear hijo (ganado principal)
  const hijo = await request(app)
    .post('/api/ganado')
    .send({
      nombre: 'Becerro Test',
      raza: 'Cruza',
      sexo: 'Macho',
      fecha_nacimiento: '2023-05-01',
      origen: 'Compra',
      proposito: 'Reproducción',
      estado: 'Sano',
      descripcion: 'Becerro de prueba para test.'
    });
  idGanadoHijo = hijo.body.id_ganado;
});

describe('API /api/descendencias', () => {

  test('POST /api/descendencias - debe crear una nueva descendencia', async () => {
    const res = await request(app)
      .post('/api/descendencias')
      .send({
        id_ganado: idGanadoHijo,
        id_madre: idMadre,
        id_padre: idPadre
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    
    // Obtener la lista completa de descendencias
    const allDesc = await request(app).get('/api/descendencias');
    
    // Buscar la descendencia recién creada usando el id_ganado
    const nuevaDesc = allDesc.body.find(d => d.id_ganado === idGanadoHijo);
    
    // Verificar que se encontró la descendencia
    expect(nuevaDesc).toBeDefined();
    
    // Usar el id_descendencia para las pruebas posteriores
    testDescendenciaId = nuevaDesc.id_descendencia;
  });

  test('GET /api/descendencias/:id - debe retornar una descendencia por ID', async () => {
    // La ruta GET /api/descendencias/:id espera un id_ganado, no un id_descendencia
    const res = await request(app).get(`/api/descendencias/${idGanadoHijo}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id_ganado', idGanadoHijo);
  });

  test('PUT /api/descendencias/:id - debe actualizar una descendencia', async () => {
    const res = await request(app)
      .put(`/api/descendencias/${testDescendenciaId}`)
      .send({
        id_ganado: idGanadoHijo, // Incluir id_ganado para evitar el error de FK
        id_madre: idMadre,
        id_padre: idPadre
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/actualizada/i);
  });

  test('DELETE /api/descendencias/:id - debe eliminar una descendencia', async () => {
    const res = await request(app).delete(`/api/descendencias/${testDescendenciaId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/eliminad[ao]/i);
  });
});
