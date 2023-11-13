import { Links, Meta } from './IPagination.interface';
import { User } from './user.interface';

export interface UserData {
  items: User[];
  meta: Meta;
  links: Links;
}
