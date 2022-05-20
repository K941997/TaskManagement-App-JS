import {MigrationInterface, QueryRunner} from "typeorm";

export class RefreshToken1652933929262 implements MigrationInterface {
    name = 'RefreshToken1652933929262'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "currentHashedRefreshToken" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "currentHashedRefreshToken"`);
    }

}
