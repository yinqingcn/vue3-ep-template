// 展平树
export function flattenTree(data: any, result: any = []) {
  data.forEach((item: any) => {
    result.push(item);
    if (item.children && item.children.length) {
      flattenTree(item.children, result);
    }
  });
  return result;
}

// 获取第一个菜单（如果第一个是多级菜单，则取第一个叶子节点）
export function getFirstMenu(data: any) {
  if (!data.children) {
    return data;
  }
  getFirstMenu(data.children[0]);
}

// 获取当前菜单的所有父节点
export function getParentMenu(list: any[], key: string) {
  const result: any = [];
  const forFn = (currentKey: string) => {
    const [current] = list.filter((item: any) => item.path === currentKey);
    if (!current) return result;
    result.unshift(current);
    if (current.parentKey) {
      const [parentMenu] = list.filter((item: any) => {
        return item.key === current.parentKey;
      });
      forFn(parentMenu.path);
    }
  };
  forFn(key);
  return result;
}
