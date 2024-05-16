import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateNoteCategories1715832537660 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'note_categories',
            columns: [
                {
                    name: 'noteId',
                    type: 'int'
                },
                {
                    name: 'categoryId',
                    type: 'int'
                }
            ]
        }));

        await queryRunner.createForeignKey('note_categories', new TableForeignKey({
            columnNames: ['noteId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'note',
            onDelete: 'CASCADE'
        }));

        await queryRunner.createForeignKey('note_categories', new TableForeignKey({
            columnNames: ['categoryId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'category',
            onDelete: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('note_categories');
    }

}
