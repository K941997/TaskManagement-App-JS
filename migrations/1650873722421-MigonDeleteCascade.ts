import {MigrationInterface, QueryRunner} from "typeorm";

export class MigonDeleteCascade1650873722421 implements MigrationInterface {
    name = 'MigonDeleteCascade1650873722421'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_entity" DROP CONSTRAINT "FK_03bb5208620ec64787aa6e54b80"`);
        await queryRunner.query(`ALTER TABLE "task_entity" ADD CONSTRAINT "FK_03bb5208620ec64787aa6e54b80" FOREIGN KEY ("authorId") REFERENCES "user_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_entity" DROP CONSTRAINT "FK_03bb5208620ec64787aa6e54b80"`);
        await queryRunner.query(`ALTER TABLE "task_entity" ADD CONSTRAINT "FK_03bb5208620ec64787aa6e54b80" FOREIGN KEY ("authorId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
