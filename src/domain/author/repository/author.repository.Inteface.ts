import Author from "../entity/author.entity";
import RepositoryInterface from "../../@shared/repository/repository.interface";

export default interface AuthorRepositoryInterface extends RepositoryInterface<Author> {}