import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  //   CreateDateColumn,
  //   UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  password: string;

  //   @Exclude()
  //   @CreateDateColumn({ name: 'created_at' })
  //   createdAt: Date;

  //   @Exclude()
  //   @UpdateDateColumn({ name: 'updated_at' })
  //   updatedAt: Date;
}
