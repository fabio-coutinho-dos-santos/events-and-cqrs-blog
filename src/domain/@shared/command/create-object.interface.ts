import RepositoryInterface from "../repository/repository.interface";

export default interface CommandCreateObjectInterface<T> {
  repository: RepositoryInterface<T>
  object: T
}