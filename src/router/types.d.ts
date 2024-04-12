import { RouteMeta } from 'vue-router';

declare interface MenuModule {
  name?: string;
  url?: string;
  path?: string;
  meta?: Partial<RouteMeta>;
  key?: string | number;
  id?: string | number;
  children?: MenuModule[];
}
