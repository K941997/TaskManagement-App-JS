import {MigrationInterface, QueryRunner} from "typeorm";

export class authorId1651739912397 implements MigrationInterface {
    name = 'authorId1651739912397'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "task_entity" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "status" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "isPublished" boolean, "authorId" integer NOT NULL, CONSTRAINT "PK_0385ca690d1697cdf7ff1ed3c2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "task_to_category_entity" ADD CONSTRAINT "FK_3cf8324e2ef5e70f4212d8fedab" FOREIGN KEY ("taskId") REFERENCES "task_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task_entity" ADD CONSTRAINT "FK_03bb5208620ec64787aa6e54b80" FOREIGN KEY ("authorId") REFERENCES "user_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_entity" DROP CONSTRAINT "FK_03bb5208620ec64787aa6e54b80"`);
        await queryRunner.query(`ALTER TABLE "task_to_category_entity" DROP CONSTRAINT "FK_3cf8324e2ef5e70f4212d8fedab"`);
        await queryRunner.query(`DROP TABLE "task_entity"`);
    }

}
