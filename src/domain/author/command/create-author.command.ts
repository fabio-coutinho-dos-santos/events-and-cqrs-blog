import { CommandInterface } from "../../@shared/command/command.interface";
import CommandCreateObjectInterface from "../../@shared/command/create-object.interface";
import Author from "../entity/author.entity";

export class CreateAuthorCommand implements CommandInterface{
  name: string;
  args: CommandCreateObjectInterface<Author>;
  constructor(name: string, args: CommandCreateObjectInterface<Author>) {
    this.name = name,
    this.args = args;
  }
}