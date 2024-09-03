import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AddUserIdForeignKeyToNotes1725311624757
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "note",
      new TableColumn({
        name: "userId",
        type: "int",
        isNullable: false,
      })
    );

    await queryRunner.createForeignKey(
      "note",
      new TableForeignKey({
        columnNames: ["userId"], // The column in the 'notes' table
        referencedColumnNames: ["id"], // The column in the referenced table
        referencedTableName: "user", // The referenced table name
        onDelete: "CASCADE", // Optional: specifies what happens on delete
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the foreign key first
    const table = await queryRunner.getTable("note");
    const foreignKey = table?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("userId") !== -1
    );
    // Check if the foreign key exists and drop it
    if (foreignKey) {
      await queryRunner.dropForeignKey("note", foreignKey);
    }

    // Then drop the userId column
    await queryRunner.dropColumn("note", "userId"); // Replace 'FK_user_notes' with the correct name or find dynamically
  }
}
