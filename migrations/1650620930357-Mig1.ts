import {MigrationInterface, QueryRunner} from "typeorm";

export class Mig11650620930357 implements MigrationInterface {
    name = 'Mig11650620930357'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "address" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "address"`);
    }

}
