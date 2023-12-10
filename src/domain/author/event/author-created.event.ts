import EventInterface from "../../@shared/event/event.interface";

export class AuthorCreatedEvent implements EventInterface {
  
  dateTime: Date;
  eventData: any;

  constructor(eventData: any) {
    this.eventData = eventData
    this.dateTime = new Date;
  }

}