import { Router } from "express";
import AuthorController from "./controllers/author.controller";
import { AuthorRepository } from "./infrastructure/database/repository/author.repository";
import { AppDataSource } from "./infrastructure/database/typeorm/sqlite/data-source";

const routes = Router();

const authorController = new AuthorController(new AuthorRepository(AppDataSource))
routes.post('/api/authors', authorController.createAuthor)
routes.get('/api/authors', authorController.getAll)

export default routes;