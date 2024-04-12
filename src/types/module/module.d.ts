declare module '*.vue' {
  import { DefineComponent } from 'vue';

  const Component: DefineComponent<{}, {}, any>;
  export default Component;
}

declare module 'element-plus/es/locale/lang/*' {
  import { Locale } from 'element-plus/types/locale-provider';

  const locale: Locale & ReadonlyRecordable;
  export default locale as Locale & ReadonlyRecordable;
}

declare module 'virtual:*' {
  const result: any;
  export default result;
}
declare module '*.less' {
  const less: any;
  export default less;
}

declare module '*.scss' {
  const scss: any;
  export default scss;
}
