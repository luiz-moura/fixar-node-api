export default interface ICreateCourseDTO {
  platform_id: string;
  instructor_id: string;
  category_id: string;
  name: string;
  about: string;
  workload: string;
  certification: string;
  level: string;
  price: string;
  pricing: string;
  url: string;
  poster: string;
  video: string;
  active: boolean;
}
