export default interface RepositoryInterface<T> {
  create(entity: T): Promise<void>
  update(entity: T, id: number): Promise<void>
  delete(id: number): Promise<void>
  findById(id: number): Promise<void>
  findAll(): Promise<T[]>
}