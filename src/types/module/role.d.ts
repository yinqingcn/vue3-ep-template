// 角色部门
declare interface RoleListItem {
  comment: string | undefined;
  id: number;
  name: string;
  resourcesDtoList: ResourceInfo[] | null;
  superAdmin: boolean;
  tenantId: number;
}

// 编辑，创建的角色
declare interface RoleItem {
  comment: string | undefined;
  name: string;
  resourcesIdList: any[];
  superAdmin: boolean;
  tenantId: number;
}

// 资源权限
declare interface ResourceListItem {
  id: number;
  name: string;
  parentId: string;
  children: ResourceListItem[] | undefined;
  data: ResourceInfo;
  checked?: boolean;
  isIndeterminate?: boolean;
}

// 资源权限详情
declare interface ResourceInfo {
  id: number;
  name: string;
  parentId: number;
  alias: string;
  code: string;
  comment: string | undefined;
  icon: string;
  iconDisplayFlag: string | undefined;
  iconType: string;
  menuExpandFlag: string | undefined;
  openType: string;
  order: number;
  source: string | undefined;
  status: boolean;
  type: string;
  url: string;
}

// 维度定义数据权限的左侧维度树
declare interface DimensionTree {
  dimension: TreeNode<DimensionInfo>[];
  dimensionAuthList: any[];
  newlyAddDataPolicy: string;
}

// 维度数据权限详情
declare interface DimensionInfo {
  createdBy: number;
  createdDate: string;
  id: number;
  itemList: any[] | null;
  lastModifiedBy: number;
  lastModifiedDate: string;
  name: string;
  newlyAddDataPolicy: string | null;
  parentId: number;
  productId: number;
  sourceId: number;
  tenantId: number;
  type: string;
}

// 维度定义数据权限的右侧次项树
declare interface dimensionAuthItem {
  itemList: TreeNode<dimensionAuthInfo>[];
  newlyAddDataPolicy: string;
}

// 右侧次项树数据详情
declare interface dimensionAuthInfo {
  createdBy: number;
  createdDate: string;
  id: number;
  lastModifiedBy: number;
  lastModifiedDate: string;
  masterDataId: number;
  name: string;
  parentId: number;
}

// 自定义数据权限表数据
declare interface customAuth {
  idList: number[];
  newlyAddDataPolicy: string;
  treeNodeList: TreeNode<customAuthTreeNode>[];
}

// 自定义数据权限树的数据详情
declare interface customAuthTreeNode {
  alias: string;
  columnAuthList: number[];
  dataResourceType: string;
  dataType: string;
  id: number;
  lastModifiedDate: number[];
  name: string;
  parentId: number;
  rowAuth: customRowAuth[];
  type: string;
}

// 自定义数据权限的行权限
declare interface customRowAuth {
  id: number;
  expression: customRowAuthExpression;
  children: customRowAuth[];
  operator: string;
  key?: number;
}
// 行权限的表达数据
declare interface customRowAuthExpression {
  id: number;
  name: string;
  type: string;
  columnType: string;
  primaryKey: number;
  value: string[];
}
// 列权限数据
declare interface customAuthColumnInfo {
  alias: string;
  id: number;
  name: string;
}
// 行权限的动态数据
declare interface dynamicData {
  dynamicType: string;
  id: number;
  name: string;
  parentId: number;
  propertyName: string;
  sourceField: string;
}
// 设置的自定义行列权限数据
declare interface authItem {
  id: number;
  columnAuthList: number[];
  rowAuth: customRowAuth;
  newlyAddDataPolicy: string;
}
// 自定义权限保存
declare interface customPermission {
  newlyAddDataPolicy: string;
  authList: authItem[];
}
