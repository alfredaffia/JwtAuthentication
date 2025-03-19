import { BeforeInsert, Column, Entity, } from "typeorm";
import { Base } from "./base.entity";
import * as bcrypt from 'bcrypt';



@Entity()
export class User extends Base {
  @Column()
  email: string;

    @Column()
    password: string;

    @BeforeInsert()
    async hashPassword() {
      this.password = await bcrypt.hash(this.password, 10);
    }
  


}