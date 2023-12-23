import QueryInterface from "./query.interface";

export default interface QueryHandlerInterface {
  execute(query: QueryInterface): Promise<any>;
}