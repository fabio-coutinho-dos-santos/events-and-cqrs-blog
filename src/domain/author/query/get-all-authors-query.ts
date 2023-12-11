import QueryInterface from "../../@shared/query/query.interface";
import AuthorRepositoryInterface from "../repository/author.repository.Inteface";

export default class GetAllAuthorsQuery implements QueryInterface {
  name: string;
  args: any;

  constructor(name: string, args: {repository: AuthorRepositoryInterface}) {
    this.name = name;
    this.args = args
  }
}