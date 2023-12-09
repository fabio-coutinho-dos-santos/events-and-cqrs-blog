import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('authors')
export default class Author {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  bio: string
}