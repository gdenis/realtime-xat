import { IRoom } from '@realtime-xat/interfaces';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../user/models/entity/user.entity';

@Entity()
export class RoomEntity implements IRoom {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToMany(() => UserEntity)
  @JoinTable()
  users?: UserEntity[];

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
