import { BeforeInsert, Column, Entity, } from "typeorm";
import { Base } from "./base.entity";
import * as bcrypt from 'bcrypt';



@Entity()
export class User extends Base {
  @Column({unique: true})
  email: string;

    @Column()
    password: string;

    @BeforeInsert()
    async hashPassword() {

      this.password = await bcrypt.hash(this.password, 10);
      // const isMatch = await bcrypt.compare(this.password, thishash);
    }
  


}