import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import Course from '@modules/courses/infra/typeorm/entities/Course';

@Entity('platforms')
class Platform {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  about: string;

  @Column()
  type: string;

  @Column({ nullable: true })
  url: string;

  @OneToMany(() => Course, course => course.platform)
  courses: Course[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Platform;
