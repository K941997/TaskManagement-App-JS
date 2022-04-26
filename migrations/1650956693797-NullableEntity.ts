import {MigrationInterface, QueryRunner} from "typeorm";

export class NullableEntity1650956693797 implements MigrationInterface {
    name = 'NullableEntity1650956693797'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_entity" ALTER COLUMN "status" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_entity" ALTER COLUMN "status" SET NOT NULL`);
    }

}
