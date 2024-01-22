import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstTables1689189135793 implements MigrationInterface {
    name = 'FirstTables1689189135793'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(120) NOT NULL, "profileImage" character varying, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_951b8f1dfc94ac1d0301a14b7e1" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "one_one" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(127) NOT NULL, "date" date NOT NULL, "hour" TIME NOT NULL, "done" boolean NOT NULL DEFAULT false, "organizerUUIDUuid" uuid, "guestUUIDUuid" uuid, CONSTRAINT "PK_970a4fe340a39bb61a9725e84d9" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "talking_points" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "point" character varying(127) NOT NULL, "oneOneUUIDUuid" uuid, CONSTRAINT "PK_018e9825a4876187ead75c17307" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "notes" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "note" character varying(127) NOT NULL, "oneOneUUIDUuid" uuid, CONSTRAINT "PK_098232e9365ec2dac9ef2f550f7" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`ALTER TABLE "one_one" ADD CONSTRAINT "FK_de161c94108b74823003190e952" FOREIGN KEY ("organizerUUIDUuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "one_one" ADD CONSTRAINT "FK_bcaa20e1bae95e1cd531b5d3d19" FOREIGN KEY ("guestUUIDUuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "talking_points" ADD CONSTRAINT "FK_a1f6b6482109a04282497f47b60" FOREIGN KEY ("oneOneUUIDUuid") REFERENCES "one_one"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notes" ADD CONSTRAINT "FK_d31b229c362ccc2c357c2fac14f" FOREIGN KEY ("oneOneUUIDUuid") REFERENCES "one_one"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notes" DROP CONSTRAINT "FK_d31b229c362ccc2c357c2fac14f"`);
        await queryRunner.query(`ALTER TABLE "talking_points" DROP CONSTRAINT "FK_a1f6b6482109a04282497f47b60"`);
        await queryRunner.query(`ALTER TABLE "one_one" DROP CONSTRAINT "FK_bcaa20e1bae95e1cd531b5d3d19"`);
        await queryRunner.query(`ALTER TABLE "one_one" DROP CONSTRAINT "FK_de161c94108b74823003190e952"`);
        await queryRunner.query(`DROP TABLE "notes"`);
        await queryRunner.query(`DROP TABLE "talking_points"`);
        await queryRunner.query(`DROP TABLE "one_one"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
