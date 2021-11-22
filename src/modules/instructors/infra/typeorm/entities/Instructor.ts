import Course from '@modules/courses/infra/typeorm/entities/Course';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('instructors')
class Instructor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  about: string;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  linkedin: string;

  @OneToMany(() => Course, course => course.instructor)
  courses: Course[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Instructor;
