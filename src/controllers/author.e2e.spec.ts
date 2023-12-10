import { AppDataSourceTest } from "../infrastructure/database/typeorm/sqlite/data-source-test"
import express from 'express'
import supertest from 'supertest'
import routes from "../routes";
import { AppDataSource } from "../infrastructure/database/typeorm/sqlite/data-source";

describe('Author routes tests', () => {

  const app = express();
  app.use(express.json())
  app.use(routes)

  beforeEach(async () => {
    await AppDataSource.initialize();
  })

  afterEach(async () => {
    await AppDataSource.close();
  })

  describe('Create', () => {
    it('should return a new Author', async () => {
      const author = {
        name: 'Name',
        age: 20,
        bio: 'bio',
        email: 'email.com'
      }
      const response = await supertest(app).post('/api/authors').send(author).expect(201);
      expect(response.body).toBeInstanceOf(Object)
      expect(response.body).toMatchObject(author)

    })
  })

  describe('Get All', () => {
    it('should return all Authors', async () => {
      const response = await supertest(app).get('/api/authors').expect(200);
      expect(response.body).toBeInstanceOf(Array)
    })
  })
}) 