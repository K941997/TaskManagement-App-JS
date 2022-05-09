import {MigrationInterface, QueryRunner} from "typeorm";

export class OK1652084370365 implements MigrationInterface {
    name = 'OK1652084370365'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_to_category_entity" DROP CONSTRAINT "FK_3cf8324e2ef5e70f4212d8fedab"`);
        await queryRunner.query(`ALTER TABLE "task_to_category_entity" DROP CONSTRAINT "FK_79c4d7ea51a13cb0d72836cc899"`);
        await queryRunner.query(`ALTER TABLE "task_to_category_entity" ADD CONSTRAINT "FK_3cf8324e2ef5e70f4212d8fedab" FOREIGN KEY ("taskId") REFERENCES "task_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task_to_category_entity" ADD CONSTRAINT "FK_79c4d7ea51a13cb0d72836cc899" FOREIGN KEY ("categoryId") REFERENCES "category_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_to_category_entity" DROP CONSTRAINT "FK_79c4d7ea51a13cb0d72836cc899"`);
        await queryRunner.query(`ALTER TABLE "task_to_category_entity" DROP CONSTRAINT "FK_3cf8324e2ef5e70f4212d8fedab"`);
        await queryRunner.query(`ALTER TABLE "task_to_category_entity" ADD CONSTRAINT "FK_79c4d7ea51a13cb0d72836cc899" FOREIGN KEY ("categoryId") REFERENCES "category_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task_to_category_entity" ADD CONSTRAINT "FK_3cf8324e2ef5e70f4212d8fedab" FOREIGN KEY ("taskId") REFERENCES "task_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
