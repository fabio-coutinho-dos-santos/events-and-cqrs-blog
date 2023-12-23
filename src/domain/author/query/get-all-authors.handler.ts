import QueryHandlerInterface from "../../@shared/query/query-handler.interface";
import QueryInterface from "../../@shared/query/query.interface";

export default class GetAllAuthorsQueryHandler implements QueryHandlerInterface {
  async execute(query: QueryInterface): Promise<any> {
    try {
      const repository = query.args.repository;
      const authors = await repository.findAll();
      return Promise.resolve(authors);
    } catch (error: any) {
      console.log(error);
      throw new Error(`Query ${query.name} execution failed`)
    }
  }
}