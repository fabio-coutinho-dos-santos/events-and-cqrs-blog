import { CommandHandlerInterface } from "../../@shared/command/command-handler.interface";
import { CommandInterface } from "../../@shared/command/command.interface";

export default class CommandCreateAuthorHandler implements CommandHandlerInterface {
  async execute(command: CommandInterface): Promise<any> {
    try {
      const repository = command.args.repository;
      const author = command.args.object
      const authorCreated = await repository.create(author);
      return Promise.resolve(authorCreated);
    } catch(error: any) {
      console.log(error)
      throw new Error(`Command ${command.name} failed`);
    }

  }

}