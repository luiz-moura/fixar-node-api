import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Instructor from '@modules/instructors/infra/typeorm/entities/Instructor';
import Platform from '@modules/platforms/infra/typeorm/entities/Platform';
import Category from '@modules/categories/infra/typeorm/entities/Category';

@Entity('courses')
class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  platform_id: string;

  @ManyToOne(() => Platform, { eager: true })
  @JoinColumn({ name: 'platform_id' })
  platform: Platform;

  @Column()
  instructor_id: string;

  @ManyToOne(() => Instructor, { eager: true })
  @JoinColumn({ name: 'instructor_id' })
  instructor: Instructor;

  @Column()
  category_id: string;

  @ManyToOne(() => Category, { eager: true })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  about: string;

  @Column({ nullable: true })
  workload: string;

  @Column({ nullable: true })
  level: string;

  @Column({ nullable: true })
  price: string;

  @Column({ nullable: true })
  pricing: string;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  poster: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Course;
