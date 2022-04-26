import {MigrationInterface, QueryRunner} from "typeorm";

export class CateEntityonDeletee1650965946944 implements MigrationInterface {
    name = 'CateEntityonDeletee1650965946944'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_to_category_entity" DROP CONSTRAINT "FK_3cf8324e2ef5e70f4212d8fedab"`);
        await queryRunner.query(`ALTER TABLE "task_to_category_entity" ADD CONSTRAINT "FK_3cf8324e2ef5e70f4212d8fedab" FOREIGN KEY ("taskId") REFERENCES "task_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_to_category_entity" DROP CONSTRAINT "FK_3cf8324e2ef5e70f4212d8fedab"`);
        await queryRunner.query(`ALTER TABLE "task_to_category_entity" ADD CONSTRAINT "FK_3cf8324e2ef5e70f4212d8fedab" FOREIGN KEY ("taskId") REFERENCES "task_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
