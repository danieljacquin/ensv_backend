import * as bcrypt from "bcrypt";
import { Exclude, Expose } from "class-transformer";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";
import { Note } from "../notes/note-entity";

@Entity()
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Exclude()
  @Column()
  password!: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt?: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt?: Date;


  @OneToMany(() => Note, (note) => note.user)
  notes?: Note[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    console.log("in hashPassWord");
    if (!this.password) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  async checkPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
