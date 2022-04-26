import {MigrationInterface, QueryRunner} from "typeorm";

export class JoinColumnName1650878290596 implements MigrationInterface {
    name = 'JoinColumnName1650878290596'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" DROP CONSTRAINT "FK_642be2eb65adc0d8bf6ee11e7ec"`);
        await queryRunner.query(`ALTER TABLE "user_entity" RENAME COLUMN "addressId" TO "cat_id"`);
        await queryRunner.query(`ALTER TABLE "user_entity" RENAME CONSTRAINT "UQ_642be2eb65adc0d8bf6ee11e7ec" TO "UQ_05ce4846e7840415406fd9015ac"`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD CONSTRAINT "FK_05ce4846e7840415406fd9015ac" FOREIGN KEY ("cat_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" DROP CONSTRAINT "FK_05ce4846e7840415406fd9015ac"`);
        await queryRunner.query(`ALTER TABLE "user_entity" RENAME CONSTRAINT "UQ_05ce4846e7840415406fd9015ac" TO "UQ_642be2eb65adc0d8bf6ee11e7ec"`);
        await queryRunner.query(`ALTER TABLE "user_entity" RENAME COLUMN "cat_id" TO "addressId"`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD CONSTRAINT "FK_642be2eb65adc0d8bf6ee11e7ec" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
