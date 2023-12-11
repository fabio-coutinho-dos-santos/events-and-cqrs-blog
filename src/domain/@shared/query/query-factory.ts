import GetAllAuthorsQuery from "../../author/query/get-all-authors-query";
import { QueryNames } from "./query-names.enum";

export default class QueryFactory {
  static createQuery(name: string, args: any) {
    switch(name) {
      case QueryNames.GET_ALL_AUTHORS:
        return new GetAllAuthorsQuery(name, args);
      default:
        throw new Error(`Query ${name} failed`)
    }
  }
}