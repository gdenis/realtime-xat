import { BeforeInsert, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

import { IUser } from "@realtime-xat/interfaces";
import { RoomEntity } from "../../../chat/model/room.entity";

@Entity()
export class UserEntity implements IUser{

  @BeforeInsert()
  emailToLowerCase(): void {
    this.email = this.email.toLocaleLowerCase();
  }

  @PrimaryGeneratedColumn()
  id?: number;

  @Column({unique: true})
  username?: string;

  @Column({unique: true})
  email: string;

  // Needed so we dont have to strip the password field from the result
  @Column({select: false})
  password?: string;

  @ManyToMany(() => RoomEntity, room => room.users)
  rooms?: RoomEntity[];

}
