import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveCascadeTrue1650878352114 implements MigrationInterface {
    name = 'RemoveCascadeTrue1650878352114'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" DROP CONSTRAINT "FK_05ce4846e7840415406fd9015ac"`);
        await queryRunner.query(`ALTER TABLE "user_entity" RENAME COLUMN "cat_id" TO "address_id"`);
        await queryRunner.query(`ALTER TABLE "user_entity" RENAME CONSTRAINT "UQ_05ce4846e7840415406fd9015ac" TO "UQ_565718033df1b968e4f738db633"`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD CONSTRAINT "FK_565718033df1b968e4f738db633" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" DROP CONSTRAINT "FK_565718033df1b968e4f738db633"`);
        await queryRunner.query(`ALTER TABLE "user_entity" RENAME CONSTRAINT "UQ_565718033df1b968e4f738db633" TO "UQ_05ce4846e7840415406fd9015ac"`);
        await queryRunner.query(`ALTER TABLE "user_entity" RENAME COLUMN "address_id" TO "cat_id"`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD CONSTRAINT "FK_05ce4846e7840415406fd9015ac" FOREIGN KEY ("cat_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
