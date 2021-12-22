import {MigrationInterface, QueryRunner} from "typeorm";

export class changeDb1640187359014 implements MigrationInterface {
    name = 'changeDb1640187359014'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "group-dao" DROP COLUMN "dao_uuid"`);
        await queryRunner.query(`ALTER TABLE "group-dao" ADD "dao_uuid" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "group-dao" DROP COLUMN "dao_uuid"`);
        await queryRunner.query(`ALTER TABLE "group-dao" ADD "dao_uuid" integer NOT NULL`);
    }

}
