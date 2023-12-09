import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('comments')
export default class Comment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({nullable: false})
  postId: number

  @Column({nullable: false})
  authorId: number

  @Column({nullable: false})
  content: string

  @Column({nullable: false})
  commentDate: Date
}