import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Unique(["name"])
@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @CreateDateColumn({ name: 'created_at'})
    createdAt?: Date

    @UpdateDateColumn({ name: 'updated_at'})
    updatedAt?: Date
}