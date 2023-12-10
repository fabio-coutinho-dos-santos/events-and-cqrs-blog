import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('authors')
export default class AuthorModel {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({nullable: false})
  age: number

  @Column({nullable: false})
  name: string

  @Column({nullable: false})
  email: string

  @Column({nullable: false})
  bio: string
}