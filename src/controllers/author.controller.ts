import EventDispatcher from "../domain/@shared/event/event-dispatcher";
import EventDispatcherInterface from "../domain/@shared/event/event-dispatcher.interface";
import EventHandlerInterface from "../domain/@shared/event/event-handler.interface";
import AuthorDto from "../domain/author/dto/author.dto";
import Author from "../domain/author/entity/author.entity";
import { AuthorCreatedEvent } from "../domain/author/event/author-created.event";
import SendEmailWhenAuthorCreatedHandler from "../domain/author/event/handler/send-email-when-author-created.handler";
import AuthorRepositoryInterface from "../domain/author/repository/author.repository.Inteface";
import { Response, Request, NextFunction } from "express";

export default class AuthorController {

  private eventDispatcher: EventDispatcherInterface;
  private sendEmailEventHandler: EventHandlerInterface;

  constructor(public authorRepository: AuthorRepositoryInterface) {
    this.createAuthor = this.createAuthor.bind(this);
    this.getAll = this.getAll.bind(this);
    this.configEvents()
   }

  configEvents() {
    this.eventDispatcher = new EventDispatcher();
    this.sendEmailEventHandler = new SendEmailWhenAuthorCreatedHandler();
  }

  async createAuthor(req: Request, resp: Response, next: NextFunction) {
    try {
      const authorDto: AuthorDto = req.body;
      const author = new Author(
        20,
        authorDto.name,
        authorDto.bio,
        authorDto.email
      )
      const authorCreated = await this.authorRepository.create(author)
      const authorCreatedEvent = new AuthorCreatedEvent(authorCreated);
      this.eventDispatcher.register(
        authorCreatedEvent.constructor.name, 
        this.sendEmailEventHandler
      )
      this.eventDispatcher.notify(authorCreatedEvent);
      this.eventDispatcher.unregister(
        authorCreatedEvent.constructor.name, 
        this.sendEmailEventHandler
      )
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