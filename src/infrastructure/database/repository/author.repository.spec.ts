
import Author from "../../../domain/author/entity/author.entity";
import { AuthorRepository } from "./author.repository";
import { AppDataSourceTest } from "../typeorm/sqlite/data-source-test";
import { DataSource } from 'typeorm'
import AuthorModel from "../typeorm/entities/author.entity";

describe('Author Repository test', () => {
  
  let dataSource: DataSource;
  let authorRepository: AuthorRepository;
  let authorStub = new Author(
    20,
    'Name1',
    'bio1',
    'email@gmail.com'
  );
  beforeEach(async () => {
    dataSource = AppDataSourceTest;
    await dataSource.initialize();
    const repoAux = dataSource.getRepository(AuthorModel)
    
    await repoAux.save(authorStub);
    authorRepository = new AuthorRepository(dataSource)
  })

  afterEach(async () => {
    await dataSource.close()
  })

  describe('create author', () => {
    it('should return a Author', async () => {  
      const author = new Author(
        22,
        'Name2',
        'bio2',
        'email@gmail.com'
      );
      const authorCreated = await authorRepository.create(author)
      expect(authorCreated).toBeDefined();
      expect(authorCreated.name).toBe(author.name)
      expect(authorCreated.age).toBe(author.age)
      expect(authorCreated.bio).toBe(author.bio)
      expect(authorCreated.email).toBe(author.email)
    })
  })

  describe('findAll', () => {
    it('should return a Author array', async () => {  
      const authors = await authorRepository.findAll()
      expect(authors).toBeDefined()
      expect(authors).toBeInstanceOf(Array)
      expect(authors.length).toBe(1)
    })
  })

  describe('findById', () => {
    it('should return one Author', async () => {  
      const author = await authorRepository.findById(1)
      expect(author).toBeDefined()
      expect(author).toBeInstanceOf(Object)
      expect(author).toMatchObject(authorStub)
    })
  })

  describe('update', () => {
    it('should return one Author', async () => {  
      const newAuthor: Partial<Author> = {
        age: 24
      }
      const author = await authorRepository.update(newAuthor, 1);
      expect(author).toBeDefined()
      expect(author).toBeInstanceOf(Object)
      expect(author.age).toBe(newAuthor.age)
    })
  })

  describe('delete', () => {
    it('should delete the Author', async () => {  
      const authorDeleted = await authorRepository.delete(1);
      expect(authorDeleted).toBeDefined()
      const authors = await authorRepository.findAll();
      expect(authors.length).toBe(0)
    })
  })

})