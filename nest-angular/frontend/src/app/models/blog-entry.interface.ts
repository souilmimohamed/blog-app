import { User } from '../models';
import { Links, Meta } from './IPagination.interface';

export interface BlogEntry {
  id?: number;
  title?: string;
  slug?: string;
  description?: string;
  body?: string;
  createdAt?: Date;
  updatedAt?: Date;
  likes?: number;
  author?: User;
  headerImage?: string;
  publishedDate?: Date;
  isPublished?: boolean;
}
export interface BlogEntries {
  items: BlogEntry[];
  meta: Meta;
  links: Links;
}
