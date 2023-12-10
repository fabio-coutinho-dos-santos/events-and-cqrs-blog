import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import { AuthorCreatedEvent } from "../author-created.event";

export default class SendEmailWhenAuthorCreatedHandler implements EventHandlerInterface<AuthorCreatedEvent> {
  handle(event: AuthorCreatedEvent): void {
    console.log('Sending email...');
  }
}