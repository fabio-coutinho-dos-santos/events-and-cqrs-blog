import { CreateAuthorCommand } from "../../author/command/create-author.command";
import { CommandNames } from "./command-names.enum";
import { CommandInterface } from "./command.interface";

export class CommandFactory {
  static createCommand(name: string, args: any) {
    switch(name) {
      case CommandNames.CREATE_AUTHOR:
        return new CreateAuthorCommand(name, args)
      default:
        throw new Error(`Command ${name} unknown`);
    }
  }
}