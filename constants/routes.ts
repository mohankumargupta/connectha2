export const route_options = {
    pending: 'pending',
    login: 'login',
    configure: 'configure',
    home: 'home',
    findha: 'ha/find',
    connect: 'ha/connect',
    entitiesList: 'home/entitiesList',
    iconsList: 'home/iconsList',
    customizeButton: 'home/customizeButton'
  } as const;
  
 export  type RouteKeyDestination = keyof typeof route_options;
  //type boo = typeof route_options[RouteDestination]
 export  type RouteDestination = typeof route_options[RouteKeyDestination]