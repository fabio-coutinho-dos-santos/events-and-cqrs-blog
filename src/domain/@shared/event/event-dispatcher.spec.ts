import Author from "../../author/entity/author.entity";
import { AuthorCreatedEvent } from "../../author/event/author-created.event";
import SendEmailWhenAuthorCreatedHandler from "../../author/event/handler/send-email-when-author-created.handler";
import EventDispatcher from "./event-dispatcher"

describe('Domain Events test', () => {
  describe('Authors events', () => {
    it('should register an event handler', () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenAuthorCreatedHandler();
      eventDispatcher.register('AuthorCreatedEvent', eventHandler);
      expect(eventDispatcher.getEventHandlers["AuthorCreatedEvent"].length).toBe(1);
      expect(eventDispatcher.getEventHandlers['AuthorCreatedEvent'][0]).toMatchObject(eventHandler);
    })

    it('should unregister an event handler', () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenAuthorCreatedHandler();
      eventDispatcher.register('AuthorCreatedEvent', eventHandler);
      expect(eventDispatcher.getEventHandlers["AuthorCreatedEvent"]).toBeDefined();
      expect(eventDispatcher.getEventHandlers["AuthorCreatedEvent"].length).toBe(1);
      expect(eventDispatcher.getEventHandlers['AuthorCreatedEvent'][0]).toMatchObject(eventHandler);

      eventDispatcher.unregister('AuthorCreatedEvent', eventHandler);
      expect(eventDispatcher.getEventHandlers["AuthorCreatedEvent"]).toBeDefined();
      expect(eventDispatcher.getEventHandlers["AuthorCreatedEvent"].length).toBe(0);
    })

    it('should unregister all event handlers', () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenAuthorCreatedHandler();
      eventDispatcher.register('AuthorCreatedEvent', eventHandler);
      expect(eventDispatcher.getEventHandlers["AuthorCreatedEvent"]).toBeDefined();
      expect(eventDispatcher.getEventHandlers["AuthorCreatedEvent"].length).toBe(1);
      expect(eventDispatcher.getEventHandlers['AuthorCreatedEvent'][0]).toMatchObject(eventHandler);

      eventDispatcher.unregisterAll();
      expect(eventDispatcher.getEventHandlers["AuthorCreatedEvent"]).toBeUndefined;
    })

    it('should notify the event handlers', () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenAuthorCreatedHandler();
      const author = new Author(
        20,
        'Name',
        'Bio',
        'Email'
      )

      const authorCreatedEvent = new AuthorCreatedEvent(author);

      const spyEventHandler = jest.spyOn(eventHandler, 'handle');

      eventDispatcher.register('AuthorCreatedEvent', eventHandler);
      expect(eventDispatcher.getEventHandlers["AuthorCreatedEvent"]).toBeDefined();
      expect(eventDispatcher.getEventHandlers["AuthorCreatedEvent"].length).toBe(1);
      expect(eventDispatcher.getEventHandlers['AuthorCreatedEvent'][0]).toMatchObject(eventHandler);

      eventDispatcher.notify(authorCreatedEvent)

      expect(spyEventHandler).toHaveBeenCalled();
      
    })

  })
})