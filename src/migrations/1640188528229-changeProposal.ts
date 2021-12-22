import {MigrationInterface, QueryRunner} from "typeorm";

export class changeProposal1640188528229 implements MigrationInterface {
    name = 'changeProposal1640188528229'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "group-dao-proposal" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIME WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIME WITH TIME ZONE NOT NULL DEFAULT now(), "proposal_id" character varying NOT NULL, "dao_id" character varying NOT NULL, "proposal_type" character varying NOT NULL, "option_1" character varying NOT NULL, "option_2" character varying NOT NULL, "group_uuid" character varying NOT NULL, CONSTRAINT "PK_948279886ac433654180a145540" PRIMARY KEY ("uuid"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "group-dao-proposal"`);
    }

}
