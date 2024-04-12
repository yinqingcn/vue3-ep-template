declare type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;

declare interface RequestOptions {
  // Splicing request parameters to url
  joinParamsToUrl?: boolean;
  // Format request parameter time
  formatDate?: boolean;
  // Whether to process the request result
  isTransformResponse?: boolean;
  /*
   * Whether to return native response headers
   * For example: use this attribute when you need to get the response headers
   */
  isReturnNativeResponse?: boolean;
  // Whether to join url
  joinPrefix?: boolean;
  // Interface address, use the default apiUrl if you leave it blank
  apiUrl?: string;
  // 请求拼接路径
  urlPrefix?: string;
  // Error message prompt type
  errorMessageMode?: ErrorMessageMode;
  // Whether to add a timestamp
  joinTime?: boolean;
  ignoreCancelToken?: boolean;
  // Whether to send token in header
  withToken?: boolean;
}

declare interface HttpResponse<T = any> {
  data: T;
  errorCode: string;
  errorMsg: string;
  status: string;
}

declare interface PageResponse<T = any> {
  content: T[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: {
    sort: {
      unsorted: boolean;
      sorted: boolean;
      empty: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
    unpaged: boolean;
  };
  size: number;
  sort: {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  };
  totalElements: number;
  totalPages: number;
}

declare interface PageRequest<T = any> {
  pageNo: number | undefined;
  pageSize: number | undefined;
  filter: T;
  sort: {
    field: string;
    direction: 'DESC' | 'ASC';
  } | null;
}

// 树状数据的类型定义
declare interface TreeNode<T = any> {
  disabled?: boolean;
  id: string | number;
  name: string;
  parentId: string | number;
  children: TreeNode[] | null;
  // 树节点上的业务数据
  data: T;
  keyData?: string;
}
