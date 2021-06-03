const mongoose = require('mongoose');
const request = require('supertest');
const app = require('./app');

describe('Book', () => {
  beforeAll(async ()=>{
    await mongoose.connect('mongodb://127.0.0.1:27017/test_db', {
      useCreateIndex: true,
      useFindAndModify: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  })

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close()
  })

  test('POST --> returns newly created book', async () => {
    const response = await request(app).post('/book').send({
      name: 'book-1',
      author: 'sumit'
    }).expect('Content-Type', /json/).expect(201);

    expect(response.body).toEqual(
      expect.objectContaining({
        book: expect.any(String)
      })
    )
  })
})