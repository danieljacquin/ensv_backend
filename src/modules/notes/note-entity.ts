import { BeforeRemove, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "../categories/category-entity";
import { dataSource } from "../../config";
import { State } from "../../enum/stateEnum";
import { User } from "../users";

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

    @ManyToOne(() => User, (user) => user.notes)
    user!: User;

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