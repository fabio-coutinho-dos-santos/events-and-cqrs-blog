import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('posts')
export default class Post {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({nullable: false})
  authorId: number

  @Column({nullable: false})
  title: string

  @Column({nullable: false})
  content: string

  @Column({nullable: false})
  publicationDate: Date
}