import {MigrationInterface, QueryRunner} from "typeorm";

export class Mig01650619382655 implements MigrationInterface {
    name = 'Mig01650619382655'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_entity_role_enum" AS ENUM('user', 'premium', 'admin')`);
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" SERIAL NOT NULL, "name" character varying, "role" "public"."user_entity_role_enum" NOT NULL DEFAULT 'user', "isAdmin" boolean, "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_9b998bada7cff93fcb953b0c37e" UNIQUE ("username"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task_entity" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "status" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "isPublished" boolean, "authorId" integer NOT NULL, CONSTRAINT "PK_0385ca690d1697cdf7ff1ed3c2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_ecbe8ebc20a3c7cd594d8e445e1" UNIQUE ("name"), CONSTRAINT "PK_1a38b9007ed8afab85026703a53" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task_entity_categories_category_entity" ("taskEntityId" integer NOT NULL, "categoryEntityId" integer NOT NULL, CONSTRAINT "PK_9020ba6d642e72ec80e6f8a45fe" PRIMARY KEY ("taskEntityId", "categoryEntityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0153eb963001c6609bcaa420be" ON "task_entity_categories_category_entity" ("taskEntityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_81250d9f615fcd5266dbbc95fc" ON "task_entity_categories_category_entity" ("categoryEntityId") `);
        await queryRunner.query(`ALTER TABLE "task_entity" ADD CONSTRAINT "FK_03bb5208620ec64787aa6e54b80" FOREIGN KEY ("authorId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task_entity_categories_category_entity" ADD CONSTRAINT "FK_0153eb963001c6609bcaa420bec" FOREIGN KEY ("taskEntityId") REFERENCES "task_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "task_entity_categories_category_entity" ADD CONSTRAINT "FK_81250d9f615fcd5266dbbc95fc8" FOREIGN KEY ("categoryEntityId") REFERENCES "category_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_entity_categories_category_entity" DROP CONSTRAINT "FK_81250d9f615fcd5266dbbc95fc8"`);
        await queryRunner.query(`ALTER TABLE "task_entity_categories_category_entity" DROP CONSTRAINT "FK_0153eb963001c6609bcaa420bec"`);
        await queryRunner.query(`ALTER TABLE "task_entity" DROP CONSTRAINT "FK_03bb5208620ec64787aa6e54b80"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_81250d9f615fcd5266dbbc95fc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0153eb963001c6609bcaa420be"`);
        await queryRunner.query(`DROP TABLE "task_entity_categories_category_entity"`);
        await queryRunner.query(`DROP TABLE "category_entity"`);
        await queryRunner.query(`DROP TABLE "task_entity"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
        await queryRunner.query(`DROP TYPE "public"."user_entity_role_enum"`);
    }

}
