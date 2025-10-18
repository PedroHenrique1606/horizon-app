export type SafeRouteParams = {
  dashboard: undefined;
  transactions: undefined;
  analytics: undefined;
  profile: undefined;
  accounts: undefined;
  'add-transaction': undefined;
};

export type UnsafeRouteParams = {
  login: undefined;
  'test-nativewind': undefined;
};

export type RouteParams = SafeRouteParams & UnsafeRouteParams;

export type SafeRoutes = keyof SafeRouteParams;
export type UnsafeRoutes = keyof UnsafeRouteParams;
export type AllRoutes = keyof RouteParams;


