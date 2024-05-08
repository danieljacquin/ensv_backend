import { BeforeRemove, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "./category-model";
import { dataSource } from "../config";
import { State } from "../enum/stateEnum";

@Entity()
export class Note {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    title!: string

    @Column()
    content!: string

    @Column({
        type: 'enum',
        enum: State,
        default: State.ACTIVE
    })
    state!: string

    @ManyToMany(() => Category, {
        cascade: true
    })
    @JoinTable({ name: 'note_categories' })
    categories?: Category[]

    @CreateDateColumn({ name: 'created_at' })
    createdAt?: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt?: Date

    @BeforeRemove()
    async beforeRemove() {

        // Remove entries from the join table
        await dataSource.getRepository(Note)
            .createQueryBuilder()
            .delete()
            .from('note_categories')
            .where('categoryId = :categoryId', { categoryId: this.id })
            .execute();
    }
}