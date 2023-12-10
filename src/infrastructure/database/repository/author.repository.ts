import { DataSource, EntityRepository, Repository, getCustomRepository, getRepository } from "typeorm";
import Author from "../../../domain/author/entity/author.entity";
import AuthorRepositoryInterface from "../../../domain/author/repository/author.repository";
import AuthorModel from "../typeorm/entities/author.entity";

export class AuthorRepository implements AuthorRepositoryInterface {

  private repository: Repository<AuthorModel>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = dataSource.getRepository(AuthorModel);
  }

  async create(entity: Author): Promise<any> {  
   const author =  await this.repository.save(entity);
    return author;
  }

  async update(entity: Author | Partial<Author>, id: number): Promise<any> {
    await this.repository.update(id, entity)
    return await this.findById(id);
  }

  async delete(id: number): Promise<any> {
    return await this.repository.delete(id);
  }

  async findById(id: number): Promise<any> {
    const author = await this.repository.findOneByOrFail({id: id});
    return author;
  }

  async findAll(): Promise<any> {
    return await this.repository.find();
  }

}