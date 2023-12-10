import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('comments')
export default class CommentModel {
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