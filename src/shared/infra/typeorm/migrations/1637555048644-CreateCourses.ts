import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateCourses1637555048644 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'courses',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'platform_id',
            type: 'uuid',
          },
          {
            name: 'instructor_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'category_id',
            type: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'about',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'workload',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'level',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'price',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'pricing',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'url',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'poster',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'video',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'certification',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'name_instructor',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'active',
            type: 'boolean',
            default: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'instructorCourse',
            referencedTableName: 'instructors',
            referencedColumnNames: ['id'],
            columnNames: ['instructor_id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
          {
            name: 'platformCourse',
            referencedTableName: 'platforms',
            referencedColumnNames: ['id'],
            columnNames: ['platform_id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
          {
            name: 'categoryCourse',
            referencedTableName: 'categories',
            referencedColumnNames: ['id'],
            columnNames: ['category_id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('courses', 'instructorCourse');
    await queryRunner.dropForeignKey('courses', 'platformCourse');
    await queryRunner.dropForeignKey('courses', 'categoryCourse');
    await queryRunner.dropTable('courses');
  }
}
