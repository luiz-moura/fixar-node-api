export default interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  status?: boolean;
  admin?: boolean;
}
