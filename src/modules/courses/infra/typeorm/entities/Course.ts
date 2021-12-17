import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { Expose } from 'class-transformer';

import Instructor from '@modules/instructors/infra/typeorm/entities/Instructor';
import Platform from '@modules/platforms/infra/typeorm/entities/Platform';
import Category from '@modules/categories/infra/typeorm/entities/Category';
import Rating from '@modules/ratings/infra/typeorm/entities/Rating';

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

  @ManyToOne(() => Category, category => category.courses, { eager: true })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(() => Rating, rating => rating.course, { eager: true })
  ratings: Rating[];

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  about: string;

  @Column({ nullable: true })
  workload: string;

  @Column({ nullable: true })
  certification: string;

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

  @Column({ nullable: true })
  name_instructor: string;

  @Column({ nullable: true })
  video: string;

  @Column()
  active: boolean;

  @Expose({ name: 'rating_media' })
  mediaRatings(): number {
    if (this.ratings) {
      const av = this.ratings.reduce(
        (prev, cur) => prev + Math.trunc(cur.value),
        0,
      );

      return av / this.ratings.length;
    }

    return 0;
  }

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Course;
