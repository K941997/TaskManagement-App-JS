import {MigrationInterface, QueryRunner} from "typeorm";

export class CustomManyToMany1650884794508 implements MigrationInterface {
    name = 'CustomManyToMany1650884794508'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "task_to_category_entity" ("taskToCategoryId" SERIAL NOT NULL, "taskId" integer NOT NULL, "categoryId" integer NOT NULL, "customOrder" integer NOT NULL, CONSTRAINT "PK_51c9a3bf4950868fb6af30bc790" PRIMARY KEY ("taskToCategoryId"))`);
        await queryRunner.query(`ALTER TABLE "task_to_category_entity" ADD CONSTRAINT "FK_3cf8324e2ef5e70f4212d8fedab" FOREIGN KEY ("taskId") REFERENCES "task_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task_to_category_entity" ADD CONSTRAINT "FK_79c4d7ea51a13cb0d72836cc899" FOREIGN KEY ("categoryId") REFERENCES "category_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_to_category_entity" DROP CONSTRAINT "FK_79c4d7ea51a13cb0d72836cc899"`);
        await queryRunner.query(`ALTER TABLE "task_to_category_entity" DROP CONSTRAINT "FK_3cf8324e2ef5e70f4212d8fedab"`);
        await queryRunner.query(`DROP TABLE "task_to_category_entity"`);
    }

}
