import AuthorDto from "../domain/author/dto/author.dto";
import Author from "../domain/author/entity/author.entity";
import AuthorRepositoryInterface from "../domain/author/repository/author.repository.Inteface";
import { Response, Request, NextFunction } from "express";

export default class AuthorController {
  constructor(public authorRepository: AuthorRepositoryInterface) {
    this.createAuthor = this.createAuthor.bind(this);
    this.getAll = this.getAll.bind(this);
   }

  async createAuthor(req: Request, resp: Response, next: NextFunction) {
    try {
      const authorDto: AuthorDto = req.body;
      const author = new Author(
        authorDto.age,
        authorDto.name,
        authorDto.bio,
        authorDto.email
      )
      const authorCreated = await this.authorRepository.create(author)
      resp.status(201).json(authorCreated);
    } catch(error: any) {
      console.log(error)
      return resp.status(500).json({
        error: error.toString()
      });
    }
  }

  async getAll(req: Request, resp: Response, next: NextFunction) {
    try {
      const authors = await this.authorRepository.findAll()
      resp.status(200).json(authors);
    } catch(error: any) {
      console.log(error)
      return resp.status(500).json({
        error: error.toString()
      });
    }
  }
}