import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateNoteTable1715809412203 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'note',
            columns: [
                { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'title', type: 'varchar' },
                { name: 'content', type: 'text' },
                { name: 'state', type: 'enum', enum: ['active', 'inactive'], default: `'active' `},
                { name: 'created_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                { name: 'updated_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('note');
    }

}
