import {MigrationInterface, QueryRunner} from "typeorm";

export class DropCustomEntityy1650965605354 implements MigrationInterface {
    name = 'DropCustomEntityy1650965605354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_to_category_entity" DROP CONSTRAINT "FK_79c4d7ea51a13cb0d72836cc899"`);
        await queryRunner.query(`ALTER TABLE "task_to_category_entity" ADD CONSTRAINT "FK_79c4d7ea51a13cb0d72836cc899" FOREIGN KEY ("categoryId") REFERENCES "category_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_to_category_entity" DROP CONSTRAINT "FK_79c4d7ea51a13cb0d72836cc899"`);
        await queryRunner.query(`ALTER TABLE "task_to_category_entity" ADD CONSTRAINT "FK_79c4d7ea51a13cb0d72836cc899" FOREIGN KEY ("categoryId") REFERENCES "category_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
