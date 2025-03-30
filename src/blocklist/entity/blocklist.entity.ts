import { Entity, Column } from 'typeorm';

@Entity()
export class Blocklist {
//   @PrimaryGeneratedColumn()
//   id: number;

  @Column()
  email: string;

}
