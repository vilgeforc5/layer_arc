export type ObjectParams<T extends Record<any, any>> = { [K in keyof T]: Parameters<T[K]> };
