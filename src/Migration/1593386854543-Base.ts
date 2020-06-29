import {MigrationInterface, QueryRunner} from "typeorm";

export class Base1593386854543 implements MigrationInterface {
    name = 'Base1593386854543'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `permission` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `role` varchar(255) NOT NULL, `guildId` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `permission`");
    }

}
