import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Course from '@modules/courses/infra/typeorm/entities/Course';
import User from '@modules/users/infra/typeorm/entities/User';

import { Type } from 'class-transformer';

@Entity('ratings')
class Rating {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.ratings, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  course_id: string;

  @ManyToOne(() => Course, course => course.ratings)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @Type(() => Number)
  @Column({ type: 'numeric' })
  value: number;

  @Column()
  comment: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Rating;
