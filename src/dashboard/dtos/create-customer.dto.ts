import { IEnvironment } from '../interfaces/Environment';
import { IUser } from '../interfaces/User';

export class CreateCustomerDTO {
  name: string;
  environments: IEnvironment[];
  users: IUser[];
}
