import { Entity, PrimaryGeneratedColumn, Column, BaseEntity,  CreateDateColumn,
  UpdateDateColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
export class Schedule extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column()
  taskName: string;

  @Field()
  @Column()
  plannedTime: number;

  @Field()
  @Column({default:0})
  actualTime: number

  @Field()
  @Column()
  date: string

  @Field()
  @Column({default:""})
  review: string

  @CreateDateColumn({
    nullable: false,
    name: 'createAt',
    comment: '创建时间'
  })
  createAt: Date | string;

  @UpdateDateColumn({
    nullable: false,
    name: 'updateAt',
    comment: '更新时间'
  })
  updateAt: Date | string;
}
