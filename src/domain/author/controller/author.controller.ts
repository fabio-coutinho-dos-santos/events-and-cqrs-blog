import { CommandNames } from "../../@shared/command/command-names.enum";
import { CommandFactory } from "../../@shared/command/command.factory";
import EventDispatcher from "../../@shared/event/event-dispatcher";
import EventDispatcherInterface from "../../@shared/event/event-dispatcher.interface";
import EventHandlerInterface from "../../@shared/event/event-handler.interface";
import QueryFactory from "../../@shared/query/query-factory";
import { QueryNames } from "../../@shared/query/query-names.enum";
import CommandCreateAuthorHandler from "../command/create-author.handler";
import AuthorDto from "../dto/author.dto";
import Author from "../entity/author.entity";
import { AuthorCreatedEvent } from "../event/author-created.event";
import SendEmailWhenAuthorCreatedHandler from "../event/handler/send-email-when-author-created.handler";
import GetAllAuthorsQueryHandler from "../query/get-all-authors.handler";
import AuthorRepositoryInterface from "../repository/author.repository.Inteface";
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
        authorDto.age,
        authorDto.name,
        authorDto.bio,
        authorDto.email
      )

      const command = CommandFactory.createCommand(
        CommandNames.CREATE_AUTHOR,
        {
          repository: this.authorRepository,
          object: author
        })
      
      const authorCreated = await new CommandCreateAuthorHandler().execute(command);

      // send the autho created event
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
    } catch (error: any) {
      console.log(error)
      return resp.status(500).json({
        error: error.toString()
      });
    }
  }

  async getAll(req: Request, resp: Response, next: NextFunction) {
    try {
      const query = QueryFactory.createQuery(QueryNames.GET_ALL_AUTHORS, {
        repository: this.authorRepository
      })
      const authors = await new GetAllAuthorsQueryHandler().execute(query)
      resp.status(200).json(authors);
    } catch (error: any) {
      console.log(error)
      return resp.status(500).json({
        error: error.toString()
      });
    }
  }
}