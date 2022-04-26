import {MigrationInterface, QueryRunner} from "typeorm";

export class MigAddressEntity1650870690763 implements MigrationInterface {
    name = 'MigAddressEntity1650870690763'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" RENAME COLUMN "address" TO "addressId"`);
        await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "street" character varying NOT NULL, "city" character varying NOT NULL, "country" character varying NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "addressId"`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "addressId" integer`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD CONSTRAINT "UQ_642be2eb65adc0d8bf6ee11e7ec" UNIQUE ("addressId")`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD CONSTRAINT "FK_642be2eb65adc0d8bf6ee11e7ec" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" DROP CONSTRAINT "FK_642be2eb65adc0d8bf6ee11e7ec"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP CONSTRAINT "UQ_642be2eb65adc0d8bf6ee11e7ec"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "addressId"`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "addressId" character varying`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`ALTER TABLE "user_entity" RENAME COLUMN "addressId" TO "address"`);
    }

}
