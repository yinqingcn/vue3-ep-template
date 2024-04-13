declare interface SystemStore {
  locale: 'zh-cn' | 'en' | null;
  menuCollapsed: null | boolean;
  theme: null | 'light' | 'dark';
}

declare interface UserStore {
  token: string | null;
  uuid: string | null;
  name: string | null;
  username: string | null;
  info: UserInfo | null;
  permission: UserPermissionInfo[] | null;
  tenantId: number | null;
  productId: number | null;
  appId: string | null;
  productInfo: object | null;
}

declare interface UserPermissionInfo {
  id: string;
  parentId: string;
  name: string;
  data: UserPermissionInfoData;
  children: UserPermissionInfo[];
}

declare class UserPermissionInfoData {
  id: string;
  name: string;
  parentId: string;
  icon: string;
  code: string;
  alias: string;
  order: number;
  type: string;
  source: any;
  url: string;
  iconType: string;
  openType: string;
  status: boolean;
}
