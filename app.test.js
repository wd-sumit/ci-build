const mongoose = require('mongoose');
const request = require('supertest');
const app = require('./app');

describe('Books API', () => {
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
        book: expect.objectContaining({
          _id: expect.any(String),
          name: expect.any(String),
          author: expect.any(String),
          __v: expect.any(Number)
        })
      })
    )
  })

  test('GET --> returns all books', async () => {
    const response = await request(app).get('/book').expect('Content-Type', /json/).expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        books: expect.arrayContaining([
          expect.objectContaining({
            _id: expect.any(String),
            name: expect.any(String),
            author: expect.any(String),
            __v: expect.any(Number)
          })

        ])
      })
    )
  })
})