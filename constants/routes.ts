/*
export const Routes = {
    first: '/',
    login: '/login',
    auth: '/auth',
    home: '/home',
    entities: '/home/entitiesList',
    icons: '/home/iconsList',
    customize: '/home/customizeButton',
};
*/

export const route_options = {
    pending: 'pending',
    login: 'login',
    configure: 'configure',
    home: 'home',
    findha: 'ha/find',
    connect: 'ha/connect',
  } as const;
  
 export  type RouteKeyDestination = keyof typeof route_options;
  //type boo = typeof route_options[RouteDestination]
 export  type RouteDestination = typeof route_options[RouteKeyDestination]