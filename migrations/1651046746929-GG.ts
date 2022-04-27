/* eslint-disable prettier/prettier */
import {MigrationInterface, QueryRunner} from "typeorm";

export class GG1651046746929 implements MigrationInterface {
    name = 'GG1651046746929'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_ecbe8ebc20a3c7cd594d8e445e1" UNIQUE ("name"), CONSTRAINT "PK_1a38b9007ed8afab85026703a53" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task_to_category_entity" ("taskToCategoryId" SERIAL NOT NULL, "taskId" integer NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_51c9a3bf4950868fb6af30bc790" PRIMARY KEY ("taskToCategoryId"))`);
        await queryRunner.query(`CREATE TABLE "task_entity" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "status" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "isPublished" boolean, "authorId" integer NOT NULL, CONSTRAINT "PK_0385ca690d1697cdf7ff1ed3c2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_entity_role_enum" AS ENUM('user', 'premium', 'admin')`);
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" SERIAL NOT NULL, "name" character varying, "role" "public"."user_entity_role_enum" NOT NULL DEFAULT 'user', "isAdmin" boolean, "username" character varying NOT NULL, "password" character varying NOT NULL, "address_id" integer, CONSTRAINT "UQ_9b998bada7cff93fcb953b0c37e" UNIQUE ("username"), CONSTRAINT "REL_565718033df1b968e4f738db63" UNIQUE ("address_id"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "street" character varying NOT NULL, "city" character varying NOT NULL, "country" character varying NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "task_to_category_entity" ADD CONSTRAINT "FK_3cf8324e2ef5e70f4212d8fedab" FOREIGN KEY ("taskId") REFERENCES "task_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task_to_category_entity" ADD CONSTRAINT "FK_79c4d7ea51a13cb0d72836cc899" FOREIGN KEY ("categoryId") REFERENCES "category_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task_entity" ADD CONSTRAINT "FK_03bb5208620ec64787aa6e54b80" FOREIGN KEY ("authorId") REFERENCES "user_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD CONSTRAINT "FK_565718033df1b968e4f738db633" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" DROP CONSTRAINT "FK_565718033df1b968e4f738db633"`);
        await queryRunner.query(`ALTER TABLE "task_entity" DROP CONSTRAINT "FK_03bb5208620ec64787aa6e54b80"`);
        await queryRunner.query(`ALTER TABLE "task_to_category_entity" DROP CONSTRAINT "FK_79c4d7ea51a13cb0d72836cc899"`);
        await queryRunner.query(`ALTER TABLE "task_to_category_entity" DROP CONSTRAINT "FK_3cf8324e2ef5e70f4212d8fedab"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
        await queryRunner.query(`DROP TYPE "public"."user_entity_role_enum"`);
        await queryRunner.query(`DROP TABLE "task_entity"`);
        await queryRunner.query(`DROP TABLE "task_to_category_entity"`);
        await queryRunner.query(`DROP TABLE "category_entity"`);
    }

}
