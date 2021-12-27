import { MigrationInterface, QueryRunner } from 'typeorm'

export class proposal1640189235305 implements MigrationInterface {
  name = 'proposal1640189235305'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "group-dao" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIME WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIME WITH TIME ZONE NOT NULL DEFAULT now(), "dao_uuid" character varying NOT NULL, "group_uuid" character varying NOT NULL, CONSTRAINT "PK_30073e4c41fd27e3a20e4c49aed" PRIMARY KEY ("uuid"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "group-dao-proposal" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIME WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIME WITH TIME ZONE NOT NULL DEFAULT now(), "proposal_id" character varying NOT NULL, "dao_id" character varying NOT NULL, "proposal_type" character varying NOT NULL, "option_1" character varying NOT NULL, "option_2" character varying NOT NULL, "group_uuid" character varying NOT NULL, CONSTRAINT "PK_948279886ac433654180a145540" PRIMARY KEY ("uuid"))`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "group-dao-proposal"`)
    await queryRunner.query(`DROP TABLE "group-dao"`)
  }
}
