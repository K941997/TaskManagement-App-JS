import {MigrationInterface, QueryRunner} from "typeorm";

export class DropCustomEntity1650961005551 implements MigrationInterface {
    name = 'DropCustomEntity1650961005551'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_to_category_entity" DROP COLUMN "customOrder"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_to_category_entity" ADD "customOrder" integer NOT NULL`);
    }

}
