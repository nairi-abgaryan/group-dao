import {MigrationInterface, QueryRunner} from "typeorm";

export class groupsDap1640157126112 implements MigrationInterface {
    name = 'groupsDap1640157126112'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "group-dao" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIME WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIME WITH TIME ZONE NOT NULL DEFAULT now(), "dao_uuid" integer NOT NULL, "group_uuid" character varying NOT NULL, CONSTRAINT "PK_30073e4c41fd27e3a20e4c49aed" PRIMARY KEY ("uuid"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "group-dao"`);
    }

}
