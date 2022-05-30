import {MigrationInterface, QueryRunner} from "typeorm";

export class FirebaseFirId1653895505058 implements MigrationInterface {
    name = 'FirebaseFirId1653895505058'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "firId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "firId"`);
    }

}
